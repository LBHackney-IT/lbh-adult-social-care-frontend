// {
//       id: 1,
//       dayId: 1,
//       day: "Monday",
//       careSummaries: [
//         {
//           id: 1,
//       timeSlot: "8am - 10am",
//           label: "Personal Care",
//           primaryCarer: "2h",
//           secondaryCarer: "30m",
//           totalHours: "2.5",
//           needAddressing:
//             ".rgaerhrae aerhe je rj ej a jear jrae tera ah err jej ejaeyhea",
//           whatShouldBeDone:
//             "aaeh  nakh jh shejrg aerghagh erjg ersug ser uug er jhgag ergjer g",
//         },
//       ],
//     }

const DaySummary = ({ daySummaryItem }) => {
  return (
    <div className="day-summary">
      <div className="day-summary-title">
        <label>{daySummaryItem.day}</label>
        <div className="day-summary-line"></div>
      </div>
      {daySummaryItem.careSummaries.map((careSummary) => {
        return (
          <div key={careSummary.id}>
            <div className="day-summary-time-slot">{careSummary.timeSlot}</div>
            <div className="columns">
              <div className="column care-label">{careSummary.label}</div>
              <div className="column level">
                <div className="level-item level-right care-time-breakdown">
                  <div className="breakdown-item">
                    <label>Primary Carer</label>
                    <label className="time-entry">
                      {careSummary.primaryCarer}
                    </label>
                  </div>
                  <div className="breakdown-item">
                    <label>Secondary Carer</label>
                    <label className="time-entry">
                      {careSummary.secondaryCarer}
                    </label>
                  </div>
                  <div className="breakdown-item total-breakdown">
                    <label>Total hrs</label>
                    <label className="time-entry">
                      {careSummary.totalHours}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns additional-detail-summaries">
              <div className="column">
                <label>Need Addressing</label>
                <p>{careSummary.needAddressing}</p>
              </div>
              <div className="column">
                <label>What should be done</label>
                <p>{careSummary.whatShouldBeDone}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DaySummary;
