// import React, { useState, useEffect } from "react";
// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./RadarChartBlock.css";

// export default function RadarChartBlock({ selectedMetrics, filtersApplied }) {
//   const [chartData, setChartData] = useState([]);

//   const shouldShowAlert =
//     filtersApplied && selectedMetrics.length > 0 && chartData.length === 0;

//   useEffect(() => {
//     async function fetchChartData() {
//       try {
//         const res = await fetch("http://localhost:3001/users?page=1&limit=200");
//         const data = await res.json();

//         const metricCounts = {};
//         selectedMetrics.forEach((metric) => {
//           metricCounts[metric] = 0;
//         });

//         data.users.forEach((user) => {
//           if (user.soft_skills) {
//             user.soft_skills.split(", ").forEach((skill) => {
//               if (metricCounts.hasOwnProperty(skill)) {
//                 metricCounts[skill] += 1;
//               }
//             });
//           }
//         });

//         const formattedData = selectedMetrics.map((metric) => ({
//           metric,
//           value: metricCounts[metric] || 0,
//         }));

//         setChartData(formattedData);
//       } catch (error) {
//         console.error("Ошибка загрузки данных для графика:", error);
//         setChartData([]);
//       }
//     }

//     if (selectedMetrics.length > 0) {
//       fetchChartData();
//     } else {
//       setChartData([]);
//     }
//   }, [selectedMetrics]);

//   if (shouldShowAlert) {
//     return (
//       <div className="radar-chart-block">
//         <div className="radar-chart-title-wrapper">Популярность скиллов!</div>
//         <div className="radar-alert">
//           🚫 Нет данных для отображения графика по выбранным метрикам
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="radar-chart-block">
//       <div className="radar-chart-title-wrapper">Популярность скиллов!</div>
//       <ResponsiveContainer width="100%" height={400}>
//         <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
//           <PolarGrid />
//           <PolarAngleAxis dataKey="metric" />
//           <PolarRadiusAxis />
//           <Tooltip />
//           <Radar
//             name="Навыки"
//             dataKey="value"
//             stroke="#8884d8"
//             fill="#8884d8"
//             fillOpacity={0.6}
//           />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./RadarChartBlock.css";

export default function RadarChartBlock({ selectedMetrics, filtersApplied }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasNonZeroValue = chartData.some((item) => item.value > 0);

  const shouldShowAlert =
    filtersApplied &&
    selectedMetrics.length > 0 &&
    (!hasNonZeroValue || chartData.length === 0);

  useEffect(() => {
    async function fetchChartData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/users?page=1&limit=200");
        const data = await res.json();

        const metricCounts = {};
        selectedMetrics.forEach((metric) => {
          metricCounts[metric] = 0;
        });

        data.users.forEach((user) => {
          if (user.soft_skills) {
            user.soft_skills.split(", ").forEach((skill) => {
              if (metricCounts.hasOwnProperty(skill)) {
                metricCounts[skill] += 1;
              }
            });
          }
        });

        const formattedData = selectedMetrics.map((metric) => ({
          metric,
          value: metricCounts[metric] || 0,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Ошибка загрузки данных для графика:", error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedMetrics.length > 0) {
      fetchChartData();
    } else {
      setChartData([]);
    }
  }, [selectedMetrics]);

  if (isLoading) {
    return (
      <div className="radar-chart-block">
        <div className="radar-chart-title-wrapper">Популярность скиллов!</div>
        <div className="radar-loading">Загрузка...</div>
      </div>
    );
  }

  if (shouldShowAlert) {
    return (
      <div className="radar-chart-block">
        <div className="radar-chart-title-wrapper">Популярность скиллов!</div>
        <div className="radar-alert">
          🚫 Нет данных для отображения графика по выбранным метрикам
        </div>
      </div>
    );
  }

  return (
    <div className="radar-chart-block">
      <div className="radar-chart-title-wrapper">Популярность скиллов!</div>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar
            name="Навыки"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
