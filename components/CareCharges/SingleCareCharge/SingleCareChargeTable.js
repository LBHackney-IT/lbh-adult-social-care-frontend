import React from 'react';
import { format } from 'date-fns';
import { MdEdit } from 'react-icons/md';
import { getNumberWithCommas } from '../../../service/helpers';
import { Table, Tag } from '../../HackneyDS/index';

export const SingleCareChargeTable = ({ data }) => {
  const columns = [
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <Tag color={value === 'Active' ? 'green' : 'gray'} className="tag-full-width">
          {value}
        </Tag>
      ),
    },
    {
      Header: 'Element',
      accessor: 'element',
      className: 'absorb-width',
    },
    {
      Header: 'Start date',
      accessor: 'startDate',
      Cell: ({ value }) => format(new Date(value), 'dd.MM.yyyy'),
    },
    {
      Header: 'End date',
      accessor: 'endDate',
      Cell: ({ value }) => (value ? format(new Date(value), 'dd.MM.yyyy') : 'Ongoing'),
    },
    {
      Header: 'Cost',
      accessor: 'cost',
      className: 'align-right',
      Cell: ({ value }) => (
        <span className="align-right">
          {value < 0 ? `-£${getNumberWithCommas(Math.abs(value))}` : `£${getNumberWithCommas(value)}`}
        </span>
      ),
      Footer: (info) => {
        const total = React.useMemo(() => info.rows.reduce((sum, row) => row.values.cost + sum, 0), [info.rows]);
        return (
          <span className="align-right">
            <strong>{`£${getNumberWithCommas(total)}`}</strong>
          </span>
        );
      },
    },
    {
      Header: () => null,
      id: 'expander',
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          <button className="icon-button" type="button" onClick={() => alert(JSON.stringify(row.original))}>
            <MdEdit size="24px" />
          </button>
        </span>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={data}
      headerClassName="table-header"
      bodyClassName="table-body"
      cellClassName="no-borders"
      footerClassName="table-footer"
      hasFooter
    />
  );
};
