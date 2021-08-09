import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import DatePick from '../DatePick';
import Popup from '../Popup';
import RadioButton from '../RadioButton';
import { createNewPayRun, getDateOfLastPayRun } from '../../api/Payments/PayRunApi';
import { stringIsNullOrEmpty } from '../../api/Utils/FuncUtils';
import { addNotification } from '../../reducers/notificationsReducer';

const PopupCreatePayRun = ({ date, setDate, closePopup, regularCycles, hocAndRelease, changeHocAndRelease, changeRegularCycles }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [daysFromLastPayRun, setDaysFromLastPayRun] = useState('XX');

  useEffect(() => {
    retrieveDateOfLastPayRun();
  }, [regularCycles]);

  const calculateDaysFromLastPayRun = (dateOfLastPayRun) => {
    if (!dateOfLastPayRun) {
      setDaysFromLastPayRun('0');
    } else {
      // Calculate date difference
      /* const start = moment(dateOfLastPayRun).format('L');
      const end = moment(date).format('L'); */
      const start = moment(dateOfLastPayRun).startOf('day');
      const end = moment(date).startOf('day');
      const duration = moment.duration(end.diff(start));
      const days = duration.asDays();
      setDaysFromLastPayRun(days.toString());
    }
  };

  const createPayRun = (
    <div className="create-pay-run">
      <div className="create-pay-run__regular-cycles">
        <p className="create-pay-run__title">Regular Cycles:</p>
        <p className="create-pay-run__text">NB - pay cycles will always include released holds.</p>
        <RadioButton
          inline={false}
          options={[
            { value: 'ResidentialRecurring', text: `Residential Recurring (3 releases)` },
            { value: 'DirectPayments', text: 'Direct Payments' },
            { value: 'HomeCare', text: 'Home care' },
          ]}
          selectedValue={regularCycles}
          onChange={(value) => changeRegularCycles(value)}
        />
      </div>
      <div className="create-pay-run__run-to">
        <p className="create-pay-run__title">Pay run to:</p>
        <DatePick dateValue={date} setDate={setDate} />
        <p className="create-pay-run__days-since">
          <span>{daysFromLastPayRun}</span> days since last cycle
        </p>
      </div>
      <div className="create-pay-run__hoc-releases">
        <p className="create-pay-run__title">Ad Hoc and Releases</p>
        <RadioButton
          inline={false}
          options={[
            { value: 'ResidentialReleaseHolds', text: `Residential released holds` },
            { value: 'DirectPaymentsReleaseHolds', text: 'Direct payments released holds' },
          ]}
          selectedValue={hocAndRelease}
          onChange={(value) => changeHocAndRelease(value)}
        />
      </div>
    </div>
  );

  const postNewPayRun = () => {
    const payRunType = regularCycles;
    if (!stringIsNullOrEmpty(payRunType)) {
      createNewPayRun(payRunType, date)
        .then((payRunId) => {
          dispatch(addNotification({ text: `Pay run created. ${payRunId}`, className: 'success' }));
        })
        .catch((err) => {
          dispatch(addNotification({ text: `Create pay run failed. ${err?.message}` }));
          setErrors([...errors, `Create pay run failed. ${err?.message}`]);
        });
    } else {
      setErrors([...errors, 'Pay run not selected']);
    }
  };

  const retrieveDateOfLastPayRun = () => {
    const payRunType = regularCycles;
    if (!stringIsNullOrEmpty(payRunType)) {
      getDateOfLastPayRun(payRunType)
        .then((payRun) => {
          if (payRun && payRun.dateTo) {
            calculateDaysFromLastPayRun(new Date(payRun.dateTo));
          } else {
            calculateDaysFromLastPayRun(null);
          }
        })
        .catch((err) => {
          setDaysFromLastPayRun('XX');
          dispatch(addNotification({ text: `Failed to fetch date of last pay run. ${err?.message}` }));
        });
    }
  };

  return (
    <Popup
      closePopup={closePopup}
      mainContent={createPayRun}
      title="Create pay run"
      firstButton={{
        text: 'Cancel',
        onClick: closePopup,
      }}
      secondButton={{
        text: 'Create Draft Pay Run',
        onClick: () => {
          postNewPayRun();
        },
      }}
    />
  );
};

export default PopupCreatePayRun;
