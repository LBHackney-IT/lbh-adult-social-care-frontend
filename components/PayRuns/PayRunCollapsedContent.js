import React from 'react';
import { currency } from '../../constants/strings';

const PayRunCollapsedContent = ({ invoice = {} }) => {
  const { invoiceItems } = invoice;
  let totalToPay = 0;
  if (!invoiceItems) return React.Fragment;
  return (
    <>
      <div className="table__row-collapsed-container">
        <div className="table__row-collapsed-header">
          <div className="table__row-collapsed-header-left">
            <p>{invoice.serviceUserName}</p>
            <p>{invoice.supplierName}</p>
          </div>
        </div>
        <div className="table__row-collapsed-main">
          <div className="table__row-collapsed-main-header">
            <p>Item</p>
            <p>Cost</p>
            <p>Qty</p>
            <p>Total</p>
            <p>Id</p>
          </div>
          {invoiceItems.map((care) => {
            totalToPay += care.totalPrice;
            return (
              <div key={care.invoiceItemId} className="table__row-collapsed-main-item">
                <p>{care.itemName}</p>
                <p>
                  {currency.euro}
                  {care.pricePerUnit}
                </p>
                <p>{care.quantity}</p>
                <p>
                  {currency.euro}
                  {care.totalPrice}
                </p>
                <p>INV {care.invoiceItemId}</p>
              </div>
            );
          })}
          <div className="table__row-collapsed-main-footer">
            <p>Total to pay</p>
            <p />
            <p />
            <p>
              {currency.euro}
              {totalToPay}
            </p>
          </div>
          {/* <div key={care.id} className="table__row-collapsed-main-item"> */}
          {/*  <p> */}
          {/*    {care.itemName} */}
          {/*  </p> */}
          {/*  <p>{care.cost}</p> */}
          {/*  <p>{care.qty}</p> */}
          {/*  <p>{care.serviceUser}</p> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PayRunCollapsedContent;
