// import React, { useState } from "react";
// import MetricPanel from "./MetricPanel/MetricPanel";
// import RadarChartBlock from "./RadarChartBlock/RadarChartBlock";
// import "./StatisticPage.css";

// export default function StatisticPage() {
//   const [selectedMetrics, setSelectedMetrics] = useState([]);
//   const [appliedMetrics, setAppliedMetrics] = useState([]);
//   const [filtersApplied, setFiltersApplied] = useState(false);

//   const handleApply = () => {
//     setAppliedMetrics(selectedMetrics);
//     setFiltersApplied(true);
//   };

//   return (
//     <div className="statistic-page-wrapper">
//       <RadarChartBlock
//         selectedMetrics={appliedMetrics}
//         filtersApplied={filtersApplied}
//       />
//       <MetricPanel
//         selectedMetrics={selectedMetrics}
//         setSelectedMetrics={setSelectedMetrics}
//         onApply={handleApply}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import MetricPanel from "./MetricPanel/MetricPanel";
import RadarChartBlock from "./RadarChartBlock/RadarChartBlock";
import LangsPanel from "./LangsPanel/LangsPanel";
import BarChartBlock from "./BarChartBlock/BarChartBlock";
import "./StatisticPage.css";

export default function StatisticPage() {
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  const [appliedSoftSkills, setAppliedSoftSkills] = useState([]);
  const [filtersAppliedSoftSkills, setFiltersAppliedSoftSkills] =
    useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [appliedLanguages, setAppliedLanguages] = useState([]);
  const [minProficiency, setMinProficiency] = useState(0);
  const [filtersAppliedLangs, setFiltersAppliedLangs] = useState(false);

  const handleApplySoftSkills = () => {
    setAppliedSoftSkills(selectedSoftSkills);
    setFiltersAppliedSoftSkills(true);
  };

  const handleApplyLangs = ({ selectedLanguages, minProficiency }) => {
    setAppliedLanguages(selectedLanguages);
    setMinProficiency(minProficiency);
    setFiltersAppliedLangs(true);
  };

  return (
    <div className="statistic-page-wrapper">
      <div className="statistic-block-wrapper">
        <RadarChartBlock
          selectedMetrics={appliedSoftSkills}
          filtersApplied={filtersAppliedSoftSkills}
        />
        <MetricPanel
          selectedMetrics={selectedSoftSkills}
          setSelectedMetrics={setSelectedSoftSkills}
          onApply={handleApplySoftSkills}
        />
      </div>

      <div className="statistic-block-wrapper">
        <BarChartBlock
          selectedLanguages={appliedLanguages}
          minProficiency={minProficiency}
          filtersApplied={filtersAppliedLangs}
        />
        <LangsPanel
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          onApply={handleApplyLangs}
        />
      </div>
    </div>
  );
}
