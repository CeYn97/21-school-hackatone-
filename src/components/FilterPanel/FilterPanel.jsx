import React, { useState, useEffect } from "react";
import "./FilterPanel.css";

const FilterPanel = ({ onApplyFilters }) => {
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);

  const [isProgrammingOpen, setIsProgrammingOpen] = useState(false);
  const [isSoftSkillsOpen, setIsSoftSkillsOpen] = useState(false);

  const [isReloading, setIsReloading] = useState(false);

  const fetchFilters = async () => {
    try {
      const res = await fetch("http://localhost:3001/filters");
      const data = await res.json();
      setProgrammingLanguages(data.programmingLanguages || []);
      setSoftSkills(data.softSkills || []);
    } catch (error) {
      console.error("Ошибка загрузки фильтров:", error);
    }
  };

  const handleReload = async () => {
    setIsReloading(true);
    try {
      await fetch("http://localhost:3001/reload", { method: "POST" });
      await fetchFilters();
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    } finally {
      setIsReloading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleLanguageChange = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSoftSkillChange = (skill) => {
    setSelectedSoftSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      languages: selectedLanguages,
      softSkills: selectedSoftSkills,
    });
  };

  const handleReset = () => {
    setSelectedLanguages([]);
    setSelectedSoftSkills([]);
    onApplyFilters({ languages: [], softSkills: [] });
  };

  const isAnyDropdownOpen = isProgrammingOpen || isSoftSkillsOpen;

  return (
    <div className="panel">
      <div className="group">
        <div
          className="group-header"
          onClick={() => setIsProgrammingOpen((prev) => !prev)}
        >
          Языки программирования
        </div>
        {isProgrammingOpen && (
          <div className="group-content">
            {programmingLanguages.map((lang) => (
              <label key={lang} className="checkbox-label">
                <span>{lang}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedLanguages.includes(lang)}
                  onChange={() => handleLanguageChange(lang)}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="group">
        <div
          className="group-header"
          onClick={() => setIsSoftSkillsOpen((prev) => !prev)}
        >
          Soft Skills
        </div>
        {isSoftSkillsOpen && (
          <div className="group-content">
            {softSkills.map((skill) => (
              <label key={skill} className="checkbox-label">
                <span>{skill}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedSoftSkills.includes(skill)}
                  onChange={() => handleSoftSkillChange(skill)}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      {isAnyDropdownOpen && (
        <div className="buttons-container">
          <button className="reset-button" onClick={handleReset}>
            Сбросить
          </button>
          <div className="action-buttons">
            <button
              className="update-button"
              onClick={handleReload}
              disabled={isReloading}
            >
              {isReloading ? "Обновляется..." : "Обновить"}
            </button>
            <button className="apply-button" onClick={handleApply}>
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
