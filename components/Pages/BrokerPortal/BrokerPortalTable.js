import React from 'react';
import { Container, Table, Tag } from '../../HackneyDS';
import { formatDate } from '../../../service/helpers';

const tagColors = {
  New: 'green',
  'In Progress': 'yellow',
  'Waiting For Approval': 'blue',
  'Not Approved': 'red',
  Ended: 'red',
  Cancelled: 'red',
  Approved: 'gray',
};

export const BrokerPortalTable = ({ onRowClick, data }) => {
  const columns = [
    {
      accessor: 'packageStatus',
      Cell: ({ value, row: { original } }) => (
        <Container>
          <Container className="status-info" display="flex">
            <p className="brokerage-portal--user-name font-size-19px font-weight-bold text-green">
              {original.serviceUserName}
            </p>
            <Tag className="text-capitalize outline" color={tagColors[value]}>
              {original.packageStatus}
            </Tag>
          </Container>
          <p className="brokerage-portal--birthdate">{formatDate(original.dateOfBirth)}</p>
          <p className="brokerage-portal--address">{original.address}</p>
        </Container>
      ),
    },
    {
      accessor: 'hackneyId',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>MosaicID</h3>
          <p>#{value}</p>
        </Container>
      ),
    },
    {
      accessor: 'packageType',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Package</h3>
          <p>{value}</p>
        </Container>
      ),
    },
    {
      accessor: 'brokerName',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Broker</h3>
          <p>{value}</p>
        </Container>
      ),
    },
    {
      accessor: 'dateAssigned',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Assigned</h3>
          <p>{formatDate(value)}</p>
        </Container>
      ),
    },
  ];
  return (
    <div className="brokerage-portal__table">
      <Table
        onRowClick={onRowClick}
        hasHeader={false}
        columns={columns}
        data={data}
        cellClassName="brokerage-portal__cell"
      />
    </div>
  );
};
