import { Button } from "../../components/Button";

const CarePackageSetup = ({ children, onBuildClick = () => {} }) => {
  return (
    <div>
      {children}
      <div className="mt-4">
        <Button onClick={onBuildClick}>Build package</Button>
      </div>
    </div>
  );
};

export default CarePackageSetup;
