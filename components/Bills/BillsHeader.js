import React from "react";
import {Button} from "../Button";

const BillsHeader = ({ addBill }) => {
  return (
    <div className='bills__header p-3'>
      <p className='title'>Bills</p>
      <Button onClick={addBill}>Add Bill</Button>
    </div>
  )
};

export default BillsHeader;
