import Input from "../../../components/Input";
import DatePick from "../../../components/DatePick";
import React, { useState } from "react";
import { Button } from "../../../components/Button";

const DayCareCreateCollege = ({
  newName = undefined,
  onCreated = () => {},
  onCancelled = () => {},
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [collegeName, setCollegeName] = useState(newName);

  const handleSaveCollege = () => {
    const collegeToCreate = {
      collegeName: collegeName,
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
    };

    // Save in api and call onCreated if successful else call onCancelled
    console.log(collegeToCreate);

    onCreated();
  };
  return (
    <div className="columns is-multiline">
      <div className="column is-3">
        <Input
          label="Name"
          placeholder=""
          value={collegeName}
          onChange={setCollegeName}
          type="text"
          classes="max-w-200px"
        />

        <DatePick
          label="End date"
          dateValue={endDate}
          setDate={setEndDate}
          classes="max-w-200px"
        />
      </div>
      <div className="column is-8">
        <DatePick
          label="Start date"
          dateValue={startDate}
          setDate={setStartDate}
          classes="max-w-200px"
        />
        <div>
          <Button
            className="button hackney-btn-green mt-2 mr-3"
            onClick={handleSaveCollege}
          >
            Save
          </Button>
          <Button
            className="button hackney-btn-green mt-2"
            onClick={onCancelled}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="column" />
    </div>
  );
};

export default DayCareCreateCollege;
