import React, { useState } from "react";
import "./FilterPanel.css";

const programmingLanguages = [
  "Python",
  "Golang",
  "JS",
  "C#",
  "HTML",
  "CSS",
  "C++",
  "Rust",
  "Ruby",
  "Java",
  "PHP",
  "Swift",
  "Kotlin",
  "Angular",
  "Flutter",
  "TS",
  "Node",
  "Electron",
];

const softSkills = [
  "Адаптивность",
  "Настойчивость",
  "Активность",
  "Коммуникабельность",
  "Ответственность",
  "Организованность",
  "Креативность",
  "Самодисциплина",
  "Эмпатия",
  "Самосовершенствование",
  "Эмоциональный интеллект",
  "Самоорганизация",
  "Клиентоориентированность",
];

const FilterPanel = () => {
  const [isSoftSkillsOpen, setIsSoftSkillsOpen] = useState(false);
  const [isProgrammingOpen, setIsProgrammingOpen] = useState(false);

  const isAnyDropdownOpen = isSoftSkillsOpen || isProgrammingOpen;

  return (
    <div className="panel">
      <div className="group">
        <div
          className="group-header"
          onClick={() => setIsSoftSkillsOpen((prev) => !prev)}
        >
          Навыки
        </div>
        {isSoftSkillsOpen && (
          <div className="group-content">
            {softSkills.map((skill) => (
              <label key={skill} className="checkbox-label">
                <span>{skill}</span>
                <input type="checkbox" className="checkbox" />
              </label>
            ))}
          </div>
        )}
      </div>
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
                <input type="checkbox" className="checkbox" />
              </label>
            ))}
          </div>
        )}
      </div>
      {isAnyDropdownOpen && (
        <div className="buttons-container">
          <button className="reset-button">Сбросить</button>
          <div className="action-buttons">
            <button className="apply-button">Применить</button>
            <button className="update-button">Обновить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
