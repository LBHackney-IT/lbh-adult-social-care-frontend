import React from "react";
import useSWR from 'swr';

const serverReporting = async () => {};

const Reporting = () => {
  const { data } = useSWR('', serverReporting);
  return (
    <div className='reporting'>
      <p>Reporting</p>
    </div>
  )
};

export default Reporting;
