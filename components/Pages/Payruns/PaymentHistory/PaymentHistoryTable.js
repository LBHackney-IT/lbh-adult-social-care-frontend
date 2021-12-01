import React from 'react';
import { Container, Link, Table } from 'components';
import { getNumberWithCommas } from 'service';
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
      Header: 'Invoice ID',
      accessor: 'invoiceId',
      Cell: ({
        value,
        row: {
          original: { payRunId },
        },
      }) => (
        <Link onClick={(e) => handleClick(e, value, payRunId)} noVisited>
          {value}
        </Link>
      ),
    },
    {
      Header: () => <Container textAlign="right">Paid</Container>,
      accessor: 'amountPaid',
      Cell: ({ value }) => <Container textAlign="right">£{getNumberWithCommas(value)}</Container>,
    },
  ];
  return <Table columns={columns} data={data} />;
};
