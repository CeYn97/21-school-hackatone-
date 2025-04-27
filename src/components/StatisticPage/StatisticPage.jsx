import React, { useState } from "react";
import MetricPanel from "./MetricPanel/MetricPanel";
import RadarChartBlock from "./RadarChartBlock/RadarChartBlock";
import "./StatisticPage.css";

export default function StatisticPage() {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [appliedMetrics, setAppliedMetrics] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleApply = () => {
    setAppliedMetrics(selectedMetrics);
    setFiltersApplied(true);
  };

  return (
    <div className="statistic-page-wrapper">
      <RadarChartBlock
        selectedMetrics={appliedMetrics}
        filtersApplied={filtersApplied}
      />
      <MetricPanel
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        onApply={handleApply}
      />
    </div>
  );
}
