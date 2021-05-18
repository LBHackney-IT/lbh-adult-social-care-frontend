import React from "react";
import DatePick from "../../components/DatePick";
import Popup from "../../components/Popup";
import RadioButton from "../../components/RadioButton";

const PopupCreatePayRun = ({
  date,
  setDate,
  closePopup,
  regularCycles,
  changeRegularCycles,
  hocAndRelease,
  changeHocAndRelease,
}) => {
  const createPayRun = (
    <div className='create-pay-run'>
      <div className='create-pay-run__regular-cycles'>
        <p className='create-pay-run__title'>Regular Cycles:</p>
        <p className='create-pay-run__text'>NB - pay cycles will always include released holds.</p>
        <RadioButton
          inline={false}
          options={[
            {value: 'residentialRecurring', text: `Residential Recurring (3 releases)`},
            {value: 'directPayments', text: 'Direct Payments'},
            {value: 'homeCare', text: 'Home care'},
          ]}
          selectedValue={regularCycles}
          onChange={(value) => changeRegularCycles(value)}
        />
      </div>
      <div className='create-pay-run__run-to'>
        <p className='create-pay-run__title'>Pay run to:</p>
        <DatePick
          dateValue={date}
          setDate={setDate}
        />
        <p className='create-pay-run__days-since'>
          <span>XX</span> days since last cycle
        </p>
      </div>
      <div className='create-pay-run__hoc-releases'>
        <p className='create-pay-run__title'>Ad Hoc and Releases</p>
        <RadioButton
          inline={false}
          options={[
            {value: 'residentialReleased', text: `Residential released holds`},
            {value: 'paymentsHolds', text: 'Direct payments released holds'},
          ]}
          selectedValue={hocAndRelease}
          onChange={(value) => changeHocAndRelease(value)}
        />
      </div>
    </div>
  );

  return (
    <Popup closePopup={closePopup} mainContent={createPayRun} title='Create pay run' firstButton={{text: 'Cancel'}} secondButton={{text: 'Create Draft Pay Run'}} />
  );
};

export default PopupCreatePayRun;
