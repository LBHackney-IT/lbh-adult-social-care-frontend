import React from 'react';
import PayRunInvoiceItems from './PayRunInvoiceItems'

const PayRunCollapsedContent = ({ invoice = {} }) => {
  const { invoiceItems } = invoice;
  if (!invoiceItems) return React.Fragment;

  const invoiceClaimedByHackney = invoiceItems.filter(item => item.claimedBy === 'Hackney');
  const invoiceClaimedByOther = invoiceItems.filter(item => item.claimedBy !== 'Hackney');

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
          <PayRunInvoiceItems
            invoiceItems={invoiceClaimedByOther}
            totalToText='Total to pay'
          />
          {!!invoiceClaimedByHackney.length &&
            <>
              <div className="table__row-collapsed-header">
                <p>Hackney’s Reclaims against this package</p>
              </div>
              <PayRunInvoiceItems
                invoiceItems={invoiceClaimedByHackney}
                totalToText='Total to reclaim'
              />
            </>
          }
        </div>
      </div>
    </>
  );
};

export default PayRunCollapsedContent;
