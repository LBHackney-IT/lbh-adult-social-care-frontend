import React, { useState } from 'react';
import DatePick from '../../DatePick';
import { Input } from '../index';

const EditElementContent = ({
  activeElement,
  editedElement,
}) => {
  const [inputs, setInputs] = useState({
    value: '',
    startDate: '',
    endDate: '',
  });

  const onChangeInput = (field) => (value) => {
    setInputs(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <>
      <div className='edit-element-content'>
        <p>ACTIVE ELEMENT</p>
        <p>{activeElement.name}</p>
        <p>{activeElement.property}</p>
      </div>
      <div className='is-flex-wrap-wrap is-flex mb-6'>
        <div>
          <p>Value</p>
          <p>{activeElement.value}</p>
        </div>
        <div>
          <p>Start date</p>
          <p>{activeElement.startDate}</p>
        </div>
        <div>
          <p>End date</p>
          <p>to be calculated</p>
        </div>
      </div>
      <div className='edit-element-content'>
        <p>EDITED ELEMENT</p>
        <p>{editedElement.name}</p>
        <p>{editedElement.property}</p>
      </div>
      <Input name='value' value={inputs.value} handler={onChangeInput('value')}  />
      <div className='is-flex is-flex-wrap-wrap'>
        <DatePick
          setDate={onChangeInput('startDate')}
          dateValue={inputs.startDate}
          label='Start Date'
        />
        <DatePick
          setDate={onChangeInput('startDate')}
          dateValue={inputs.startDate}
          label='Start Date'
        />
      </div>
    </>
  )
};

export default EditElementContent;