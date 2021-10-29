import React from 'react';
import { formatDate, getTagColorFromStatusId, getTagDisplayTextFromStatusId } from 'service';
import { Container, Table, Tag } from '../../HackneyDS';

export const PackageApprovalsTable = ({ onRowClick, data }) => {
  const columns = [
    {
      accessor: 'status',
      Cell: ({ value, row: { original: {
        serviceUser: {
          fullName,
          dateOfBirth,
          addressLine1,
          addressLine2,
          addressLine3,
          postCode,
          town
        }}}}) => {
        const address = [];

        [addressLine1 || addressLine2 || addressLine3, town, postCode].forEach(addressString => {
          if(addressString) {
            address.push(addressString)
          }
        });

        return (
          <Container>
            <Container className="status-info" display="flex">
              <p className="brokerage-portal--user-name font-size-19px font-weight-bold text-green">
                {fullName}
              </p>
              <Tag className="text-capitalize outline" color={getTagColorFromStatusId(value)}>
                {getTagDisplayTextFromStatusId(value)}
              </Tag>
            </Container>
            <p className="brokerage-portal--birthdate">{formatDate(dateOfBirth)}</p>
            {address.length && (
              <p className="brokerage-portal--address">
                {address.join(', ')}
              </p>
            )}
          </Container>
        )
      },
    },
    {
      accessor: 'hackneyId',
      Cell: ({ row: { original }}) => {
        const { hackneyId } = original.serviceUser;
        return (
          <Container className="brokerage-portal__cell-with-title">
            <h3>Hackney ID</h3>
            <p>#{hackneyId}</p>
          </Container>
        )
      },
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
      accessor: 'approver',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Approver</h3>
          <p>{value || '—'}</p>
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
