import React from 'react';

const PayRunCollapsedContent = ({ invoice = {} }) => {
  const { invoiceItems } = invoice;
  if(!invoiceItems) return React.Fragment;
  return (
    <>
      {invoiceItems.map((care) => (
          <div key={care.id} className="table__row-collapsed-container">
            <div className="table__row-collapsed-header">
              <div className="table__row-collapsed-header-left">
                <p>{invoice.serviceUserName}</p>
                <p>{invoice.supplierName}</p>
              </div>
              <p>INV {care.invoiceItemId}</p>
            </div>
            <div className="table__row-collapsed-main">
              <div className="table__row-collapsed-main-header">
                <p>Item</p>
                <p>Cost</p>
                <p>Qty</p>
                <p>Total</p>
              </div>
              <div key={care.id} className="table__row-collapsed-main-item">
                <p>
                  {care.itemName}
                </p>
                <p>{care.pricePerUnit}</p>
                <p>{care.quantity}</p>
                <p>{care.totalPrice}</p>
              </div>
              {/*<div key={care.id} className="table__row-collapsed-main-item">*/}
              {/*  <p>*/}
              {/*    {care.itemName}*/}
              {/*  </p>*/}
              {/*  <p>{care.cost}</p>*/}
              {/*  <p>{care.qty}</p>*/}
              {/*  <p>{care.serviceUser}</p>*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
    </>
  )
}

export default PayRunCollapsedContent;