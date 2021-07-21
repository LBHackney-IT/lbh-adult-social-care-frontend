import React from 'react';
import Input from '../Input';
import DatePick from '../DatePick';
import CardInfo from './CardInfo';

const AddBillInvoiceFor = ({ inputs, invoice }) => (
  <CardInfo classes="invoice-for" title="Invoice For">
    <Input
      label="Package ID"
      classes="invoice-for__package-id"
      value={inputs?.packageId.value}
      error={inputs?.packageId.error}
      onChange={inputs?.packageId.onChange}
    />
    <div className="invoice-for__supplier">
      <p>{invoice?.from || 'From'}</p>
      <p>{invoice?.supplierName || 'SUPPLIER NAME'}</p>
    </div>
    <DatePick
      error={inputs?.serviceFrom.error}
      dateValue={inputs?.serviceFrom.value}
      classes="invoice-for__datepicker service-from"
      label="Service From"
    />
    <DatePick
      error={inputs?.serviceTo.error}
      dateValue={inputs?.serviceTo.value}
      classes="invoice-for__datepicker"
      label="Service To"
    />
  </CardInfo>
);

export default AddBillInvoiceFor;
