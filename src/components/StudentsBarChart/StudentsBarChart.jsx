import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../../App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultData = {
  labels: ["HTML", "CSS", "JS", "Не интересуются"],
  datasets: [
    {
      label: "Количество студентов",
      data: [20, 60, 70, 20],
      backgroundColor: "rgba(0,0,0,0.8)",
      barPercentage: 0.6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 20 },
    },
  },
};

export default function StudentsBarChart({ data = defaultData }) {
  return (
    <div className="chart-wrapper">
      <Bar options={options} data={data} />
    </div>
  );
}
