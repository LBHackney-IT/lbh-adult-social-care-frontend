import React, { useState } from 'react';
import { Checkbox, Container, Heading, HorizontalSeparator, Table, VerticalSeparator } from 'components/HackneyDS';
import { CaretDownIcon } from 'components/Icons';
import { formatDate, getNumberWithCommas } from 'service/helpers';

export const CareDetails = ({ title, data }) => {
  const [isExpanded, setExpanded] = useState(true);

  const columns = [
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Element',
      accessor: 'element',
    },
    {
      Header: 'Start date',
      accessor: 'startDate',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'End date',
      accessor: 'endDate',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Weekly cost',
      accessor: 'weeklyCost',
      className: 'align-right',
      Cell: ({ value }) => (
        <span className="align-right">
          {value < 0 ? `-£${getNumberWithCommas(Math.abs(value))}` : `£${getNumberWithCommas(value)}`}
        </span>
      ),
    },
  ];
  return (
    <>
      <Container alignItems="baseline" borderBottom="1px solid #BFC1C3">
        <Container display="flex" alignItems="baseline">
          <Heading size="xl">{title}</Heading>
          <VerticalSeparator width="20px" />
          <Container
            display="flex"
            className={`review-package-details__accordion-info${isExpanded ? ' accordion-opened' : ''}`}
          >
            <p onClick={() => setExpanded(!isExpanded)} className="link-button">
              {isExpanded ? 'Hide' : 'Collapse'}
            </p>
            <CaretDownIcon />
          </Container>
        </Container>
        {isExpanded && (
          <Container>
            <HorizontalSeparator height="20px" />
            <Checkbox label="Show only active elements" />
            <HorizontalSeparator height="5px" />
            <Table
              columns={columns}
              data={data}
              headerClassName="care-details__table-header"
              cellClassName="care-details__table-cell"
            />
          </Container>
        )}
        <HorizontalSeparator height="28px" />
      </Container>
    </>
  );
};
