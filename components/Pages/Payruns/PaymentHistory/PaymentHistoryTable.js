import React from 'react';
import { Container, Link, Table } from 'components';
import { formatNumberToCurrency } from 'service';
import format from 'date-fns/format';
import { getInvoiceRoute } from 'routes/RouteConstants';
import { useRouter } from 'next/router';

export const PaymentHistoryTable = ({ data }) => {
  const router = useRouter();

  const handleClick = (e, invoiceId, payRunId) => {
    e.preventDefault();
    router.push(getInvoiceRoute(payRunId, invoiceId));
  };

  const columns = [
    {
      Header: 'Period',
      accessor: 'periodTo',
      Cell: ({
        value,
        row: {
          original: { periodFrom },
        },
      }) => <> {`${format(new Date(periodFrom), 'dd/MM/yyy')} - ${format(new Date(value), 'dd/MM/yyy')}`}</>,
    },
    {
      Header: 'Invoice Number',
      accessor: 'invoiceNumber',
      Cell: ({
        value,
        row: {
          original: { payRunId, invoiceId },
        },
      }) => (
        <Link onClick={(e) => handleClick(e, invoiceId, payRunId)} noVisited>
          {value}
        </Link>
      ),
    },
    {
      Header: () => <Container textAlign="right">Paid</Container>,
      accessor: 'amountPaid',
      Cell: ({ value }) => <Container textAlign="right">{formatNumberToCurrency(value)}</Container>,
    },
  ];
  return <Table columns={columns} data={data} />;
};
