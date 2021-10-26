import React from 'react';
import { formatDate, getTagColorFromStatus } from 'service';
import { userTagColors } from 'constants/variables';
import { Container, Table, Tag } from '../../../HackneyDS'
import TitleSubtitle from './TitleSubtitle';

export const CareChargesTable = ({ onRowClick, data }) => {
  const columns = [
    {
      accessor: 'packageStatus',
      Cell: ({ row: { original } }) => (
        <Container className='new-care-charge__card'>
          <Container className="new-care-charge__card-title" display="flex">
            <p>{original.serviceUser}</p>
            <Tag className="outline" color={getTagColorFromStatus(original.status, userTagColors)}>
              {original.status}
            </Tag>
            {original.isS117Client && <Tag className="outline" color="red">S117</Tag>}
          </Container>
          <p className="new-care-charge__card-date">{formatDate(original.dateOfBirth)}</p>
          <p className="new-care-charge__card-address">{original.address}</p>
          <Container display="flex" justifyContent="space-between">
            <Container display="flex">
              <TitleSubtitle title="Hackney ID" subtitle={`#${original.hackneyId}`} />
              <TitleSubtitle title="Package" subtitle={original.packageType} />
            </Container>
          </Container>
        </Container>
      ),
    },
    {
      accessor: 'startDate',
      Cell: ({ value }) => (
        <Container className='start-date-cell'>
          <TitleSubtitle title="Start date" subtitle={formatDate(value)} />
        </Container>
      ),
    },
    {
      accessor: 'lastModified',
      Cell: ({ value }) => (
        <Container>
          <TitleSubtitle title="Last modified" subtitle={formatDate(value)} />
        </Container>
      ),
    },
    {
      accessor: 'modifiedBy',
      Cell: ({ value }) => <TitleSubtitle title="by" subtitle={value} />,
    },
  ];
  return (
    <div className="care-charges__table">
      <Table
        onRowClick={onRowClick}
        hasHeader={false}
        columns={columns}
        data={data}
        cellClassName="care-charges__cell"
      />
    </div>
  );
};
