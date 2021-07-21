import React from "react";
import useSWR from 'swr';

const serverPaymentsCareCharges = async () => {};

const CareCharges = () => {
  const { data } = useSWR('', serverPaymentsCareCharges);
  return (
    <div className='care-charges'>
      <p>Care Charges</p>
    </div>
  )
};

export default CareCharges;
