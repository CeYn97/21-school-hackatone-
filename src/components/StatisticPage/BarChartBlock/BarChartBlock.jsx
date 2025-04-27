import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./BarChartBlock.css";

export default function BarChartBlock({
  selectedLanguages,
  minProficiency,
  filtersApplied,
}) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasNonZeroValue = chartData.some((item) => item.value > 0);
  const shouldShowAlert =
    filtersApplied &&
    selectedLanguages.length > 0 &&
    (!hasNonZeroValue || chartData.length === 0);

  useEffect(() => {
    async function fetchChartData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/users?page=1&limit=200");
        const data = await res.json();

        const langCounts = {};
        selectedLanguages.forEach((lang) => {
          langCounts[lang] = 0;
        });

        data.users.forEach((user) => {
          if (user.langs && user.proficiency) {
            const userLangs = user.langs.split(" ");
            userLangs.forEach((lang) => {
              if (
                langCounts.hasOwnProperty(lang.toUpperCase()) &&
                parseInt(user.proficiency) >= minProficiency
              ) {
                langCounts[lang.toUpperCase()] += 1;
              }
            });
          }
        });

        const formattedData = selectedLanguages.map((lang) => ({
          language: lang,
          value: langCounts[lang] || 0,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Ошибка загрузки данных для графика:", error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedLanguages.length > 0) {
      fetchChartData();
    } else {
      setChartData([]);
    }
  }, [selectedLanguages, minProficiency]);

  return (
    <div className="bar-chart-block">
      <div className="bar-chart-title-wrapper">
        Уровни владения языками программирования
      </div>

      {isLoading ? (
        <div className="bar-loading">Загрузка...</div>
      ) : shouldShowAlert ? (
        <div className="bar-alert">
          🚫 Нет данных для отображения графика по выбранным метрикам
        </div>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="language" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}
