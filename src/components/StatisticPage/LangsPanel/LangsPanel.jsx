import React, { useState, useEffect } from "react";
import "./LangsPanel.css";

export default function LangsPanel({ onApply }) {
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [proficiency, setProficiency] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    fetchLanguages();
  }, []);

  async function fetchLanguages() {
    try {
      const res = await fetch("http://localhost:3001/filters");
      const data = await res.json();
      setProgrammingLanguages(data.programmingLanguages || []);
    } catch (error) {
      console.error("Ошибка загрузки языков:", error);
    }
  }

  const handleApply = () => {
    onApply({
      selectedLanguages,
      minProficiency: proficiency,
    });
  };

  const handleReload = async () => {
    setIsReloading(true);
    await fetchLanguages();
    setIsReloading(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="langs-panel">
      <div className="langs-group">
        <div
          className="langs-group-header"
          onClick={() => setIsPanelOpen((prev) => !prev)}
        >
          Метрики
        </div>
        {isPanelOpen && (
          <div className="langs-group-content">
            <div className="langs-checkboxes">
              {programmingLanguages.map((lang) => (
                <label key={lang} className="langs-checkbox-label">
                  <span>{lang}</span>
                  <input
                    type="checkbox"
                    className="langs-checkbox"
                    checked={selectedLanguages.includes(lang)}
                    onChange={() => handleLanguageChange(lang)}
                  />
                </label>
              ))}
            </div>
            <div className="langs-range-container">
              <label htmlFor="proficiency-range">
                Минимальный уровень навыка: {proficiency}%
              </label>
              <input
                type="range"
                id="proficiency-range"
                min="0"
                max="100"
                step="1"
                value={proficiency}
                onChange={(e) => setProficiency(Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      {isPanelOpen && (
        <div className="langs-buttons-container">
          <button
            className="langs-reset-button"
            onClick={() => {
              setSelectedLanguages([]);
              setProficiency(0);
            }}
          >
            Сбросить
          </button>
          <div className="langs-action-buttons">
            <button
              className="langs-update-button"
              onClick={handleReload}
              disabled={isReloading}
            >
              {isReloading ? "Обновляется..." : "Обновить"}
            </button>
            <button className="langs-apply-button" onClick={handleApply}>
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
