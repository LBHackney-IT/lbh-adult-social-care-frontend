import "../assets/careTitle.scss";

const CareTitle = ({ children, startDate, endDate }) => {
  return (
    <div className="care-title">
      <label>{children}</label>
      <div className="care-date-range">
        <div className="date-entry">
          {startDate}
          {endDate !== undefined ? ` - ${endDate}` : null}
        </div>
      </div>
    </div>
  );
};

export default CareTitle;
