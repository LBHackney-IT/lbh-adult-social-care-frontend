import React, { useState } from 'react';
import { format } from 'date-fns';
import { Table, Tag } from '../../HackneyDS';
import { ToggleBlueIcon } from '../../Icons';
import { currency } from '../../../constants/strings';

export const FundedNursingCareTable = ({ data }) => {
  const [isOpenNotes, setIsOpenNotes] = useState(false);
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
      Header: 'Collected by',
      accessor: 'collectedBy',
      Cell: ({ value }) => value
    },
    {
      Header: 'Weekly cost',
      accessor: 'weeklyCost',
      Cell: ({ value }) => (
        <p className='is-flex is-align-items-center'>
          {currency.euro}{value}<span className='hackney-text-green font-weight-bold ml-3'>NET OFF</span>
        </p>
      )
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
      Header: '',
      accessor: 'notes',
      Cell: () => (
        <div
          className='align-right is-flex is-align-items-center is-clickable'
          onClick={() => setIsOpenNotes(!isOpenNotes)}
        >
          <p className='link-button mr-3 is-flex is-align-items-center'>Notes</p>
          <ToggleBlueIcon className={isOpenNotes ? '' : 'icon-animation-rotation-negative'}/>
        </div>
      ),
    },
  ];
  return (
    <div className='funded-nursing-care__table'>
      <Table
        columns={columns}
        data={data}
        headerClassName="table-header"
        bodyClassName="table-body"
        cellClassName="no-borders"
      />
      {isOpenNotes && <p>{data[0].notes}</p>}
    </div>
  );
};
