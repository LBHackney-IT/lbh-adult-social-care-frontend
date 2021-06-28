import Input from "../../../components/Input";
import DatePick from "../../../components/DatePick";
import React, { useState } from "react";
import { Button } from "../../../components/Button";
import { createDayCareCollege } from "../../../../api/CarePackages/DayCareApi";
import inputValidator from "../../../../service/inputValidator";

const DayCareCreateCollege = ({
  newName = undefined,
  onCreated = () => {},
  onCancelled = () => {},
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [collegeName, setCollegeName]    = useState(newName);
  const [errorFields, setErrorFields] = useState({
    collageName: [],
    startDate:  [],
    endDate: [],
  });

  const changeErrorFields = (field, value) => {
    setErrorFields({
      ...errorFields,
      [field]: value,
    });
  };

  const handleSaveCollege = () => {
    const { validFields, hasErrors } = inputValidator({
      inputs: [
        {name: 'startDate', value: startDate, rules: ['empty']},
        {name: 'endDate', value: endDate, rules: ['empty']},
        {name: 'collegeName', value: collegeName, rules: ['empty']}
      ]
    });
    setErrorFields(validFields);
    if(!hasErrors) return;
    const collegeToCreate = {
      collegeName: collegeName,
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
    };

    // Save in api and call onCreated if successful else call onCancelled
    createDayCareCollege(collegeToCreate)
      .then(() => {
        onCreated();
      })
      .catch((error) => {
        onCancelled();
      });
  };
  return (
    <div className="columns is-multiline">
      <div className="column is-3">
        <Input
          label="Name"
          placeholder=""
          value={collegeName}
          fields
          error={errorFields.collageName[0]}
          setError={() => changeErrorFields('collageName', [])}
          onChange={setCollegeName}
          type="text"
          classes="max-w-200px"
        />

        <DatePick
          label="End date"
          error={errorFields.endDate[0]}
          dateValue={endDate}
          setDate={setEndDate}
          setError={() => changeErrorFields('endDate', [])}
          classes="max-w-200px"
        />
      </div>
      <div className="column is-8">
        <DatePick
          label="Start date"
          dateValue={startDate}
          setError={() => changeErrorFields('startDate', [])}
          error={errorFields.endDate[0]}
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
