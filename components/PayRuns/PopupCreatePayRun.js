import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import DatePick from '../DatePick';
import Popup from '../Popup';
import RadioButton from '../RadioButton';
import { createNewPayRun, getDateOfLastPayRun, PAY_RUN_TYPES } from '../../api/Payments/PayRunApi';
import { stringIsNullOrEmpty } from '../../api/Utils/FuncUtils';
import { addNotification } from '../../reducers/notificationsReducer';

const PopupCreatePayRun = ({ date, updateData, setDate, closePopup, regularCycles, changeRegularCycles }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [emptyField, setEmptyField] = useState(false);
  const [daysFromLastPayRun, setDaysFromLastPayRun] = useState('XX');

  useEffect(() => {
    retrieveDateOfLastPayRun();
  }, [regularCycles, date]);

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
          error={emptyField ? 'Required field' : ''}
          inline={false}
          options={[
            { value: PAY_RUN_TYPES.RESIDENTIAL_RECURRING, text: `Residential Recurring (3 releases)` },
            { value: PAY_RUN_TYPES.DIRECT_PAYMENTS, text: 'Direct Payments' },
            { value: PAY_RUN_TYPES.HOME_CARE, text: 'Home care' },
            {
              header: <p className="create-pay-run__title mt-5">Ad Hoc and Releases</p>,
              value: PAY_RUN_TYPES.RESIDENTIAL_RELEASE_HOLDS,
              text: `Residential released holds`
            },
            { value: PAY_RUN_TYPES.DIRECT_PAYMENTS_RELEASE_HOLDS, text: 'Direct payments released holds' },
          ]}
          selectedValue={regularCycles}
          onChange={(value) => {
            changeRegularCycles(value);
            setEmptyField(false);
          }}
        />
      </div>
      <div className="create-pay-run__run-to">
        <p className="create-pay-run__title">Pay run to:</p>
        <DatePick dateValue={date} setDate={setDate} />
        <p className="create-pay-run__days-since">
          <span>{daysFromLastPayRun}</span> days since last cycle
        </p>
      </div>
    </div>
  );

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const postNewPayRun = () => {
    const payRunType = regularCycles;
    if (!stringIsNullOrEmpty(payRunType)) {
      createNewPayRun(payRunType, date)
        .then(async (payRunId) => {
          closePopup();
          await updateData();
          pushNotification(`Pay run created. ${payRunId}`,'success');
        })
        .catch((error) => {
          pushNotification(error)
          setErrors([...errors, error]);
        });
    } else {
      setEmptyField(true);
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
        .catch((error) => {
          setDaysFromLastPayRun('XX');
          pushNotification(error);
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
