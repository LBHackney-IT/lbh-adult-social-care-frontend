import React from "react";
import {Button} from "../../components/Button";

const AddBillTotalInfo = ({ addBill, addBillInfo }) => {
  return (
    <div className='total-info'>
      <p>Subtotal: <span>{addBillInfo?.subtotal || ''}</span></p>
      <p>VAT: <span>{addBillInfo?.VAT || ''}</span></p>
      <p>Grand Total: <span>{addBillInfo?.grandTotal || ''}</span></p>
      <Button className='total-info__save-button' onClick={addBill}>Save</Button>
    </div>
  );
};

export default AddBillTotalInfo;
