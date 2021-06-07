import React from "react";
import Input from "../Input";
import DatePick from "../DatePick";
import CardInfo from "./CardInfo";

const AddBillInvoiceDetails = ({ inputs }) => {
  return (
    <CardInfo classes='invoice-details' title={'Invoice Details'}>
      <DatePick classes='invoice-details__date' dateValue={inputs?.invoiceDate.value} setDate={inputs?.invoiceDate.onChange} label='Invoice Date' />
      <DatePick classes='invoice-details__due' dateValue={inputs?.invoiceDue.value} setDate={inputs?.invoiceDue.onChange} label='Invoice Due' />
      <Input label='INV Ref' value={inputs?.invRef?.value} onChange={inputs?.invRef.onChange} />
    </CardInfo>
  );
};

export default AddBillInvoiceDetails;
