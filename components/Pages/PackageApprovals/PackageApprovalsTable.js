import React from 'react';
import { formatDate, getPackageStatusTextFromStatusId, getPackageColorFromStatusId } from 'service';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';
import { Container, Table, Tag } from '../../HackneyDS';

export const PackageApprovalsTable = ({ searchTerm, getPackageTypeById, onRowClick, data }) => {
  const handleName = (name) => getHighlightedSearchQuery(name, searchTerm);
  const columns = [
    {
      accessor: 'status',
      Cell: ({
        value,
        row: {
          original: {
            serviceUser: { fullName, dateOfBirth, addressLine1, addressLine2, addressLine3, postCode, town },
          },
        },
      }) => {
        const address = [];

        const addressLine = addressLine1 || addressLine2 || addressLine3;
        if (addressLine) address.push(addressLine);
        if (town) address.push(town);
        if (postCode) address.push(postCode);

        return (
          <Container>
            <Container className="status-info" display="flex">
              <p className="brokerage-portal--user-name font-size-19px font-weight-bold text-green">
                {searchTerm ? handleName(fullName) : fullName}
              </p>
              <Tag className="text-capitalize outline" color={getPackageColorFromStatusId(value)}>
                {getPackageStatusTextFromStatusId(value)}
              </Tag>
            </Container>
            <p className="brokerage-portal--birthdate">{formatDate(dateOfBirth)}</p>
            {!!address.length && <p className="brokerage-portal--address">{address.join(', ')}</p>}
          </Container>
        );
      },
    },
    {
      accessor: 'hackneyId',
      Cell: ({
        row: {
          original: {
            serviceUser: { hackneyId },
          },
        },
      }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Hackney ID</h3>
          <p>#{hackneyId}</p>
        </Container>
      ),
    },
    {
      accessor: 'packageType',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Package</h3>
          <p>{getPackageTypeById(value)}</p>
        </Container>
      ),
    },
    {
      accessor: 'approver',
      Cell: ({ value }) => (
        <Container className="brokerage-portal__cell-with-title">
          <h3>Approver</h3>
          <p>{value?.name || '—'}</p>
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
