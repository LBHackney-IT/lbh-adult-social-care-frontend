import React from 'react';
import { currency } from '../../constants/strings';
import { getNumberWithCommas } from '../../service/helpers';

const PayRunInvoiceItems = ({
  invoiceItems = [],
  totalToText,
}) => {
  let totalToPay = 0;
  return (
    <>
        <div className="table__row-collapsed-main-header">
          <p>Item</p>
          <p>Cost</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Id</p>
        </div>
        {invoiceItems.map(({ totalPrice, invoiceItemId, pricePerUnit, quantity, itemName }) => {
          totalToPay += totalPrice;
          return (
            <div key={invoiceItemId} className="table__row-collapsed-main-item">
              <p>{itemName}</p>
              <p>
                {currency.euro}
                {getNumberWithCommas(pricePerUnit)}
              </p>
              <p>{quantity}</p>
              <p>
                {currency.euro}
                {getNumberWithCommas(totalPrice)}
              </p>
              <p>INV {invoiceItemId}</p>
            </div>
          );
        })}
        <div className="table__row-collapsed-main-footer">
          <p>{totalToText}</p>
          <p />
          <p />
          <p>
            {currency.euro}
            {getNumberWithCommas(totalToPay)}
          </p>
        </div>
      </>
  )
};

export default PayRunInvoiceItems;