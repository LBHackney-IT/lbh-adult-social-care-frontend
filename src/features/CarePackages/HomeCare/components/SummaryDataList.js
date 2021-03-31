import { Button } from "../../../components/Button";
import DaySummary from "./DaySummary";

const SummaryDataList = ({ summaryData }) => {
  return (
    <>
      {summaryData.map((summaryItem) => {
        return <DaySummary key={summaryItem.id} daySummaryItem={summaryItem} />;
      })}
      <div className="mt-5 level">
        <div className="level-item level-right">
          <Button onClick={() => alert("Confirm Package")}>
            Confirm Package
          </Button>
        </div>
      </div>
    </>
  );
};

export default SummaryDataList;
