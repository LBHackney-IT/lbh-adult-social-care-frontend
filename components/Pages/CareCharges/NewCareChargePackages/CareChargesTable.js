import React, { useMemo } from 'react';
import { formatDate, getTagColorFromStatus } from 'service';
import { userTagColors } from 'constants/variables';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';
import { Container, Heading, Table, Tag } from '../../../HackneyDS';
import TitleSubtitle from './TitleSubtitle';

const rowHaveHeader = ({ serviceUser, status, searchTerm, isS117Client, address, dateOfBirth }) => (
  <Container className="new-care-charge__card">
    <Container className="new-care-charge__card-title" display="flex">
      <p>{searchTerm ? getHighlightedSearchQuery(serviceUser, searchTerm) : serviceUser}</p>
      <Tag outline color={getTagColorFromStatus(status, userTagColors)}>
        {status}
      </Tag>
      {isS117Client && (
        <Tag outline color="red">
          S117
        </Tag>
      )}
    </Container>
    <p className="new-care-charge__card-date">{formatDate(dateOfBirth)}</p>
    {!!address?.trim?.() && <p className="new-care-charge__card-address">{address}</p>}
  </Container>
);

const columnsRow = [
  { accessor: 'hackneyId', title: 'Hackney ID', subtitle: (value) => `#${value}` },
  { accessor: 'packageType', title: 'Package' },
  { accessor: 'startDate', title: 'Start date', subtitle: (value) => formatDate(value) },
  { accessor: 'lastModified', title: 'Last modified', subtitle: (value) => formatDate(value) },
  { accessor: 'modifiedBy', title: 'by' },
];

export const CareChargesTable = ({ onRowClick, data, searchTerm = '' }) => {
  if (!data) return null;

  const columns = useMemo(
    () =>
      columnsRow.map(({ accessor, className = '', title, subtitle }) => ({
        accessor,
        Cell: ({ value }) => (
          <TitleSubtitle
            className={className}
            title={title}
            subtitle={<Heading fontWeight={100} color='#6f777b' size='s'>{subtitle ? subtitle(value) : value || '—'}</Heading>}
          />
        ),
      })),
    []
  );

  return (
    <div className="care-charges__table">
      <Table
        rowsHaveHeader={(props) => rowHaveHeader({ ...props, searchTerm })}
        onRowClick={onRowClick}
        cellClassName='care-charges__cell'
        hasHeader={false}
        columns={columns}
        data={data}
      />
    </div>
  );
};
