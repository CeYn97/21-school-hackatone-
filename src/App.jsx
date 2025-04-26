import React, { useState } from "react";
import Header from "./components/Header/Header";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import StudentPage from "./components/StudentPage/StudentPage";
import "./App.css";

function App() {
  const [filters, setFilters] = useState({ languages: [], softSkills: [] });

  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-content">
        <FilterPanel onApplyFilters={setFilters} />
        <StudentPage
          selectedLanguages={filters.languages}
          selectedSoftSkills={filters.softSkills}
        />
      </div>
    </div>
  );
}

export default App;
