import React, { useState } from "react";
import Header from "./components/Header/Header";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import StudentPage from "./components/StudentPage/StudentPage";
import StatisticPage from "./components/StatisticPage/StatisticPage";
import "./App.css";

function App() {
  const [filters, setFilters] = useState({ languages: [], softSkills: [] });
  const [activeTab, setActiveTab] = useState("Главная");

  return (
    <div className="app-wrapper">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className={`app-content ${
          activeTab === "Статистика" ? "statistic-mode" : ""
        }`}
      >
        {activeTab === "Главная" && (
          <>
            <FilterPanel onApplyFilters={setFilters} />
            <StudentPage
              selectedLanguages={filters.languages}
              selectedSoftSkills={filters.softSkills}
            />
          </>
        )}
        {activeTab === "Статистика" && <StatisticPage />}
      </div>
    </div>
  );
}

export default App;
