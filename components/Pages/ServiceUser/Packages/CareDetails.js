import React, { useState } from 'react';
import {
  Checkbox,
  Container,
  Heading,
  HorizontalSeparator,
  Table,
  VerticalSeparator,
  Link,
  Announcement,
  WarningText,
  Hint,
} from 'components';
import { formatDate, getNumberWithCommas } from 'service';
import { getCarePackageCareChargeRoute, getCarePackageDetailsRoute } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import { confirmS117 } from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { CaretDownIcon } from '../../../Icons';
import { CarePackageStatus } from './CarePackageStatus';

const CareDetails = ({
  packageId,
  title,
  data,
  isS117Client,
  isS117ClientConfirmed: isS117ClientConfirmedInitial,
  netTotal,
  packageStatus,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filteredData = data.filter((d) => d.status === 'Active' || d.status === 'In Progress');
  const [isExpanded, setExpanded] = useState(true);
  const [isS117ClientConfirmed, setIsS117ClientConfirmed] = useState(isS117ClientConfirmedInitial);

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

  const goToPackageDetails = (e) => {
    e.preventDefault();
    router.push(getCarePackageDetailsRoute(packageId));
  };

  const goToCareCharge = (e) => {
    e.preventDefault();
    router.push(getCarePackageCareChargeRoute(packageId));
  };

  const handleS117 = async (e) => {
    e.preventDefault();
    try {
      await confirmS117({ packageId });
      dispatch(addNotification({ text: 'Success', className: 'success'}));
      setIsS117ClientConfirmed(true);
    } catch (error) {
      dispatch(addNotification({ text: error }));
    }
  };

  return (
    <>
      <Container alignItems="baseline" borderBottom="1px solid #BFC1C3">
        <Container display="flex" alignItems="baseline">
          <Container display="flex" alignItems="center">
            <CarePackageStatus status={packageStatus} packageData={data} />
            <VerticalSeparator width="10px" />
            <Heading size="xl">{title}</Heading>
          </Container>
          <VerticalSeparator width="20px" />
          <Container display="flex" alignItems="center">
            <p onClick={() => setExpanded(!isExpanded)} className="link-button">
              {isExpanded ? 'Hide' : 'Collapse'}
            </p>
            <VerticalSeparator width="5px" />
            <CaretDownIcon />
          </Container>
        </Container>

        {isExpanded && (
          <>
            <HorizontalSeparator height="10px" />
            {isS117Client && !isS117ClientConfirmed && (
              <Announcement isError>
                <WarningText>This client has been categorised as S117.</WarningText>
                <Container display="flex">
                  No care charges need to be applied
                  <VerticalSeparator width="24px" />
                  <Link onClick={(e) => handleS117(e)} noVisited>
                    Confirm
                  </Link>
                </Container>
              </Announcement>
            )}

            {data.length > 0 ? (
              <Container>
                <HorizontalSeparator height="40px" />
                <Container display="flex" justifyContent="space-between" alignItems="center">
                  <Checkbox
                    label="Show only Active/In Progress elements"
                    value={activeOnly}
                    onChangeValue={() => setFilter(!activeOnly)}
                  />
                  <Container display="flex" justifyContent="space-between" alignItems="center">
                    {!isS117Client && (
                      <Link className="mr-5" onClick={goToCareCharge} noVisited>
                        {data.some(({ type, status, name }) => (
                          type === "Package Reclaim - Care Charge" && status === 'Active' && (
                            name === "Without Property 13+ Weeks" || name === "Without Property 1-12 Weeks")
                          )
                        ) ?
                          'Edit financial assessment' :
                          'Add financial assessment'
                        }
                      </Link>
                    )}

                    <Link onClick={goToPackageDetails} noVisited>
                      Package details
                    </Link>
                  </Container>
                </Container>
                <HorizontalSeparator height="5px" />
                <Table
                  columns={columns}
                  data={activeOnly ? filteredData : data}
                  headerClassName="care-details__table-header"
                  cellClassName="care-details__table-cell"
                />
                <Container background="#f8f8f8" padding="20px" display="flex" justifyContent="flex-end">
                  Provider paid <VerticalSeparator width="10px" />
                  <strong style={{ color: '#00664F' }}>NET OFF</strong>
                  <VerticalSeparator width="30px" />
                  <strong>
                    {netTotal < 0
                      ? `-£${getNumberWithCommas(Math.abs(netTotal).toFixed(2))}`
                      : `£${getNumberWithCommas(Math.abs(netTotal).toFixed(2))}`}
                  </strong>
                </Container>
              </Container>
            ) : (
              <>
                <HorizontalSeparator height="20px" />
                <Hint>No package details</Hint>
              </>
            )}
          </>
        )}
        <HorizontalSeparator height="28px" />
      </Container>
      <HorizontalSeparator height="28px" />
    </>
  );
};

export default CareDetails;
