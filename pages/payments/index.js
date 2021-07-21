import React from "react";
import useSWR from 'swr';

const serverPayments = async () => {};

const PaymentsPage = () => {
  const { data } = useSWR('', serverPayments);

  return (
    <div className='payments-page'>
      <p>Payments page</p>
    </div>
  );
};

export default PaymentsPage;
