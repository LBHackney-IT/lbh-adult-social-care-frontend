import DaySummary from "./DaySummary";

const SummaryDataList = ({ summaryData }) => {
  return (
    <>
      {summaryData.map((summaryItem) => {
        return <DaySummary key={summaryItem.id} daySummaryItem={summaryItem} />;
      })}
    </>
  );
};

export default SummaryDataList;
