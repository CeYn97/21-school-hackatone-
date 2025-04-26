import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.jpg";
import "./Header.css";

export default function Header() {
  const tabs = ["Главная", "Статистика"];
  const [activeTab, setActiveTab] = useState("Главная");

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Логотип" className="header-logoStyle" />
        </div>
        <h1 className="header-headline">Поиск студентов</h1>
        <div className="navigation-wrapper">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="active-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="tab-label">{tab}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="header-avatar">
          <img src={avatar} alt="Профиль" className="header-avatarStyle" />
        </div>
      </div>
    </header>
  );
}
