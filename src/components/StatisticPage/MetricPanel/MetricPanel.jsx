import React, { useState, useEffect } from "react";
import "./MetricPanel.css"; // Стили отдельно

export default function MetricPanel({
  selectedMetrics,
  setSelectedMetrics,
  onApply,
}) {
  const [metrics, setMetrics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    try {
      const res = await fetch("http://localhost:3001/filters");
      const data = await res.json();
      setMetrics(data.softSkills || []);
    } catch (error) {
      console.error("Ошибка загрузки метрик:", error);
    }
  }

  const handleMetricChange = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const handleReload = async () => {
    try {
      setIsReloading(true);
      await fetch("http://localhost:3001/reload", { method: "POST" });
      await fetchMetrics();
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
    } finally {
      setIsReloading(false);
    }
  };

  const handleApply = () => {
    onApply(selectedMetrics);
  };

  const handleReset = () => {
    setSelectedMetrics([]);
  };

  return (
    <div
      className={`metric-panel-wrapper ${
        isOpen ? "metric-open" : "metric-closed"
      }`}
    >
      <div className="metric-group">
        <div
          className="metric-group-header"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Метрики
        </div>
        {isOpen && (
          <div className="metric-group-content">
            {metrics.map((metric) => (
              <label key={metric} className="metric-checkbox-label">
                <span>{metric}</span>
                <input
                  type="checkbox"
                  className="metric-checkbox"
                  checked={selectedMetrics.includes(metric)}
                  onChange={() => handleMetricChange(metric)}
                />
              </label>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="metric-buttons-container">
          <button className="metric-reset-button" onClick={handleReset}>
            Сбросить
          </button>
          <div className="metric-action-buttons">
            <button
              className="metric-update-button"
              onClick={handleReload}
              disabled={isReloading}
            >
              {isReloading ? "Обновляется..." : "Обновить"}
            </button>
            <button className="metric-apply-button" onClick={handleApply}>
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
