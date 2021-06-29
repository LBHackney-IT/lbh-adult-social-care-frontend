import React from "react";
import Input from "../Input";
import DatePick from "../DatePick";
import CardInfo from "./CardInfo";

const AddBillInvoiceDetails = ({ inputs }) => {
  return (
    <CardInfo classes='invoice-details' title={'Invoice Details'}>
      <DatePick classes='invoice-details__date' error={inputs?.invoiceDate.error} dateValue={inputs?.invoiceDate.value} setDate={inputs?.invoiceDate.onChange} label='Invoice Date' />
      <DatePick classes='invoice-details__due' error={inputs?.invoiceDue.error} dateValue={inputs?.invoiceDue.value} setDate={inputs?.invoiceDue.onChange} label='Invoice Due' />
      <Input label='INV Ref' value={inputs?.invRef?.value} error={inputs?.invRef.error} onChange={inputs?.invRef.onChange} />
    </CardInfo>
  );
};

export default AddBillInvoiceDetails;
