import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import DatePick from '../DatePick';
import { Button } from '../Button';
import { createDayCareCollege } from '../../api/CarePackages/DayCareApi';
import fieldValidator from '../../service/inputValidator';
import { addNotification } from '../../reducers/notificationsReducer';

const DayCareCreateCollege = ({ newName = undefined, onCreated = () => {}, onCancelled = () => {} }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [collegeName, setCollegeName] = useState(newName);
  const [errorFields, setErrorFields] = useState({
    collageName: '',
    startDate: '',
    endDate: '',
  });

  const changeErrorFields = (field, value) => {
    setErrorFields({
      ...errorFields,
      [field]: value,
    });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleSaveCollege = () => {
    const { validFields, hasErrors } = fieldValidator([
      { name: 'startDate', value: startDate, rules: ['empty'] },
      { name: 'endDate', value: endDate, rules: ['empty'] },
      { name: 'collegeName', value: collegeName, rules: ['empty'] },
    ]);
    setErrorFields(validFields);
    if (!hasErrors) return;
    const collegeToCreate = {
      collegeName,
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
      creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
    };

    // Save in api and call onCreated if successful else call onCancelled
    createDayCareCollege(collegeToCreate)
      .then(() => {
        onCreated();
      })
      .catch((error) => {
        pushNotification(error);
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
          error={errorFields.collageName}
          setError={() => changeErrorFields('collageName', [])}
          onChange={setCollegeName}
          type="text"
          classes="max-w-200px"
        />

        <DatePick
          label="End date"
          error={errorFields.endDate}
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
          error={errorFields.endDate}
          setDate={setStartDate}
          classes="max-w-200px"
        />
        <div>
          <Button className="button hackney-btn-green mt-2 mr-3" onClick={handleSaveCollege}>
            Save
          </Button>
          <Button className="button hackney-btn-green mt-2" onClick={onCancelled}>
            Cancel
          </Button>
        </div>
      </div>
      <div className="column" />
    </div>
  );
};

export default DayCareCreateCollege;
