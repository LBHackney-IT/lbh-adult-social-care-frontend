import React, { useState } from 'react';
import { usePushNotification, formatDate, formatNumberToCurrency } from 'service';
import { getCarePackageCareChargeRoute, getCarePackageDetailsRoute } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import { confirmS117 } from 'api';
import {
  Announcement,
  Checkbox,
  Collapse,
  Container,
  Heading,
  HorizontalSeparator,
  InsetText,
  Link,
  Table,
  VerticalSeparator,
  WarningText,
} from '../../../HackneyDS';
import { CaretDownIcon } from '../../../Icons';
import { CarePackageStatus } from './CarePackageStatus';
import Loading from '../../../Loading';

const statusColors = {
  New: 'light-red',
  'In Progress': 'blue',
  'Waiting for Approval': 'purple',
  Approved: 'blue',
  Future: 'blue',
  Active: 'green',
  'Not Approved': 'dark-red',
  End: 'gray',
  Ended: 'gray',
  Cancelled: 'gray',
};

const CareDetails = ({
  packageId,
  isLoading,
  title,
  data,
  isS117Client,
  isS117ClientConfirmed: isS117ClientConfirmedInitial,
  netTotal,
  packageStatus,
}) => {
  const pushNotification = usePushNotification();
  const router = useRouter();
  const filteredData = data.filter((d) => d.status === 'Active' || d.status === 'In Progress');
  const [loading, setLoading] = useState(false);
  const [isS117ClientConfirmed, setIsS117ClientConfirmed] = useState(isS117ClientConfirmedInitial);

  const columns = [
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => <p className={`lbh-color-${statusColors[value]}`}>{value}</p>,
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
      Cell: ({ value }) => (<span className="align-right">{formatNumberToCurrency(value)}</span>),
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
    setLoading(true);
    try {
      await confirmS117({ packageId });
      pushNotification('Success', 'success');
      setIsS117ClientConfirmed(true);
      router.push(getCarePackageCareChargeRoute(packageId));
    } catch (error) {
      pushNotification(error);
    }
    setLoading(false);
  };

  const isEndOrCancelled = ['End', 'Cancelled'].includes(packageStatus);

  return (
    <>
      <Loading isLoading={isLoading || loading} />
      <Collapse
        isButtonClickOnly
        style={{
          width: '100%',
          borderBottom: '1px solid #BFC1C3',
          padding: '0 0 24px',
        }}
        className="care-details__package-collapse"
        IconComponent={CaretDownIcon}
        title={
          <Container alignItems="baseline">
            <Container display="flex" alignItems="baseline">
              <Container display="flex" alignItems="center">
                <CarePackageStatus status={packageStatus} packageData={data} />
                <VerticalSeparator width="10px" />
                <Heading size="xl">{title}</Heading>
              </Container>
            </Container>
          </Container>
        }
      >
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
                {!isS117Client && !isEndOrCancelled && (
                  <Link className="mr-5" onClick={goToCareCharge} noVisited>
                    {data.some(
                      ({ type, status, name }) =>
                        type === 'Package Reclaim - Care Charge' &&
                        status === 'Active' &&
                        (name === 'Without Property 13+ Weeks' || name === 'Without Property 1-12 Weeks')
                    )
                      ? 'Edit financial assessment'
                      : 'Add financial assessment'}
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
              <strong>{formatNumberToCurrency(netTotal)}</strong>
            </Container>
          </Container>
        ) : (
          <>
            <HorizontalSeparator height="20px" />
            <InsetText>No package details</InsetText>
          </>
        )}
      </Collapse>
    </>
  );
};

export default CareDetails;
