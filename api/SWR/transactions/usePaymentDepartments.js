import { useMemo } from 'react';
import useGetData from '../useGetData';

const usePaymentDepartments = () => {
  const { data } = useGetData('/transactions/departments/payment-departments', 'Fail get Departments');

  const options = useMemo(() => data.map((el) => ({ value: el.departmentId, text: el.departmentName })), [data]);

  return { data, options };
};

export default usePaymentDepartments;
