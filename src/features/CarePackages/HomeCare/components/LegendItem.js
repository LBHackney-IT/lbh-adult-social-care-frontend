const LegendItem = ({ className, children }) => {
  return (
    <div className="legend-item">
      <div className={"legend-colour " + className}></div>
      {children}
    </div>
  );
};

export default LegendItem;
