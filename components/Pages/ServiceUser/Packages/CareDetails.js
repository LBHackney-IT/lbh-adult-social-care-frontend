import React, { useState } from 'react';
import { formatDate, getNumberWithCommas } from 'service';
import { getCarePackageDetailsRoute } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import { CaretDownIcon } from '../../../Icons';
import { Checkbox, Container, Heading, HorizontalSeparator, Table, VerticalSeparator, Link } from '../../../HackneyDS';

const CareDetails = ({ id, title, data }) => {
  const router = useRouter();
  const filteredData = data.filter((d) => d.status === 'Active');
  const [isExpanded, setExpanded] = useState(true);

  const columns = [
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Element',
      accessor: 'name',
    },
    {
      Header: 'Start date',
      accessor: 'startDate',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'End date',
      accessor: 'endDate',
      Cell: ({ value }) => (value ? formatDate(value) : 'Ongoing'),
    },
    {
      Header: 'Weekly cost',
      accessor: 'weeklyCost',
      className: 'align-right',
      Cell: ({ value }) => (
        <span className="align-right">
          {value < 0
            ? `-£${getNumberWithCommas(Math.abs(value).toFixed(2))}`
            : `£${getNumberWithCommas(Math.abs(value).toFixed(2))}`}
        </span>
      ),
    },
  ];

  const [activeOnly, setFilter] = useState(false);

  const handleClick = () => router.push(getCarePackageDetailsRoute(id));

  return (
    <>
      <Container alignItems="baseline" borderBottom="1px solid #BFC1C3">
        <Container display="flex" alignItems="baseline">
          <Heading size="xl">{title}</Heading>
          <VerticalSeparator width="20px" />
          <Container display="flex" alignItems="center">
            <p onClick={() => setExpanded(!isExpanded)} className="link-button">
              {isExpanded ? 'Hide' : 'Collapse'}
            </p>
            <VerticalSeparator width="5px" />
            <CaretDownIcon />
          </Container>
        </Container>
        <Container display='flex' justifyContent='flex-end'>
        <Link onClick={handleClick} noVisited>Package details</Link>
        </Container>
        {isExpanded && (
          <Container>
            <HorizontalSeparator height="20px" />
            <Checkbox
              label="Show only active elements"
              value={activeOnly}
              onChangeValue={() => setFilter(!activeOnly)}
            />
            <HorizontalSeparator height="5px" />
            <Table
              columns={columns}
              data={activeOnly ? filteredData : data}
              headerClassName="care-details__table-header"
              cellClassName="care-details__table-cell"
            />
          </Container>
        )}
        <HorizontalSeparator height="28px" />
      </Container>
      <HorizontalSeparator height="28px" />
    </>
  );
};

export default CareDetails;
