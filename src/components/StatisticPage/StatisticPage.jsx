import React, { useState } from "react";
import MetricPanel from "./MetricPanel/MetricPanel";
import RadarChartBlock from "./RadarChartBlock/RadarChartBlock";
import "./StatisticPage.css";

export default function StatisticPage() {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [appliedMetrics, setAppliedMetrics] = useState([]);

  return (
    <div className="statistic-page-wrapper">
      <RadarChartBlock selectedMetrics={appliedMetrics} />
      <MetricPanel
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        onApply={() => setAppliedMetrics(selectedMetrics)}
      />
    </div>
  );
}
