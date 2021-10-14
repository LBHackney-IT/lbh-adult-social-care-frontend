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
        <span className='funded-nursing-care__weekly-cost'>
          {currency.euro}{value}
          <span className='hackney-text-green font-weight-bold '>
            NET OFF
          </span>
        </span>
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
          className='notes-button'
          onClick={() => setIsOpenNotes(!isOpenNotes)}
        >
          <span className='link-button'>Notes</span>
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
      {isOpenNotes && <p className='funded-nursing-care__notes'>{data[0].notes}</p>}
    </div>
  );
};
