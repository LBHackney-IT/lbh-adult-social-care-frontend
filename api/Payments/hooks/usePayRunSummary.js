import { useEffect, useState } from 'react';
import { getPayRunSummaryList } from '../PayRunApi';

export const REQUEST_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

function usePayRunSummary() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    retrievePayRunSummaryList();
  }, []);

  const retrievePayRunSummaryList = () => {
    getPayRunSummaryList()
      .then((res) => {
        const payRuns = res.data || [];
        const options = payRuns.map((option) => ({
          id: option?.payRunId,
          date: option?.dateCreated,
          type: option?.payRunTypeName,
          cadence: '',
          paid: `£${option?.totalAmountPaid}`,
          held: `£${option?.totalAmountHeld}`,
          status: option?.payRunStatusName,
        }));
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        console.log(res);
        setData(options);
      })
      .catch((err) => {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setErrors([...errors, `Retrieve opportunity times per month options failed. ${err.message}`]);
      });
  };

  return {
    data,
    requestStatus,
    errors,
  };
}

export default usePayRunSummary;
