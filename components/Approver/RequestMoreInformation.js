import React from 'react';
import TextArea from '../TextArea';

const RequestMoreInformation = ({
  errorFields,
  changeErrorFields,
  setRequestInformationText,
  handleRequestMoreInformation,
  requestMoreInformationText,
}) => (
    <div className="columns">
      <div className="column">
        <div className="mt-1">
          <p className="font-size-16px font-weight-bold">Request more information</p>
          <TextArea
            error={errorFields.requestInformationText}
            setError={() => changeErrorFields('changeErrorFields')}
            label=""
            rows={5}
            value={requestMoreInformationText}
            placeholder="Add details..."
            onChange={setRequestInformationText}
          />
          <button className="button hackney-btn-green" onClick={handleRequestMoreInformation}>
            Request more information
          </button>
        </div>
      </div>
    </div>
  );

export default RequestMoreInformation;