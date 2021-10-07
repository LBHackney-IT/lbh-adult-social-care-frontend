import React from 'react';
import { Container, Table, Tag } from '../../HackneyDS';
import { formatDate, formatStatus } from '../../../service/helpers';

const tagColors = {
  new: 'green',
  'in-progress': 'yellow',
  'waiting-approval': 'blue',
  'not-approved': 'red',
  approved: 'gray',
};

export const BrokerageHubTable = ({ data }) => {
  const columns = [
    {
      accessor: 'packageStatus',
      Cell: ({ value, row: { original }}) => {
        return (
          <Container>
            <Container className='status-info' display="flex">
              <p className='brokerage-hub--user-name font-size-19px font-weight-bold text-green'>{original.userName}</p>
              <Tag className='text-capitalize with-border' color={tagColors[value]}>{formatStatus(value)}</Tag>
            </Container>
            <p className='brokerage-hub--birthdate'>{formatDate(original.dateOfBirth)}</p>
            <p className='brokerage-hub--address'>{original.address}</p>
          </Container>
        );
      },
    },
    {
      accessor: 'mosaicId',
      Cell: ({ value }) => (
        <Container className="brokerage-hub__cell-with-title">
          <h3>MosaicID</h3>
          <p>#{value}</p>
        </Container>
      )
    },
    {
      accessor: 'packageName',
      Cell: ({ value }) => (
        <Container className="brokerage-hub__cell-with-title">
          <h3>Package</h3>
          <p>{value}</p>
        </Container>
      )
    },
    {
      accessor: 'brokerName',
      Cell: ({ value }) => (
        <Container className="brokerage-hub__cell-with-title">
          <h3>Broker</h3>
          <p>{value}</p>
        </Container>
      )
    },
    {
      accessor: 'assigned',
      Cell: ({ value }) => (
        <Container className="brokerage-hub__cell-with-title">
          <h3>Assigned</h3>
          <p>{formatDate(value)}</p>
        </Container>
      ),
    },
  ];
  return (
    <div className="brokerage-hub__table">
      <Table hasHeader={false} columns={columns} data={data} />
    </div>
  );
};
