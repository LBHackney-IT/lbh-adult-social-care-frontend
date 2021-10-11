import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePick from 'components/DatePick';
import FormGroup from 'components/HackneyDS/FormGroup';
import Pagination from 'components/Payments/Pagination';
import BrokerageHeader from 'components/Brokerage/BrokerageHeader/BrokerageHeader';
import { BrokerageHubTable } from 'components/Brokerage/BrokerageHub/BrokerageHubTable';
import { Button, Container, HorizontalSeparator, SearchBox, Select } from 'components/HackneyDS';
import { CARE_PACKAGE_ROUTE, APPROVER_HUB_ROUTE, BROKERAGE_HUB_ROUTE, LOGOUT_ROUTE } from 'routes/RouteConstants';
import useCarePackageApi from '../api/SWR/CarePackage/useCarePackageApi';
import withSession from '../lib/session';
import { getUserSession } from '../service/helpers';

const statusOptions = [
  { text: 'New', value: '1' },
  { text: 'In Progress', value: '2' },
  { text: 'Submitted For Approval', value: '3' },
  { text: 'Approved', value: '4' },
  { text: 'Not Approved', value: '5' },
  { text: 'Ended', value: '6' },
  { text: 'Cancelled', value: '7' },
];

const links = [
  { text: 'Broker Portal', href: BROKERAGE_HUB_ROUTE },
  { text: 'Care Charges', href: CARE_PACKAGE_ROUTE },
  { text: 'Approvals', href: APPROVER_HUB_ROUTE },
  { text: 'Log Out', href: LOGOUT_ROUTE },
];

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };
  return { props: {} };
});

const BrokerageHub = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data } = useCarePackageApi.brokerView({ pageNumber });

  const router = useRouter();
  const [status, setStatus] = useState('');
  const [searchPackages, setSearchPackages] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const onRowClick = (rowItem) => {
    router.push({
      pathname: `care-package/service-users/${rowItem?.serviceUserId}/core-package-details`,
      query: { packageId: rowItem.packageId },
    });
  };

  const findServiceUser = async () => {
    alert('Find a service user');
  };

  return (
    <div className="brokerage-hub">
      <BrokerageHeader links={links} />

      <Container background="#FAFAFA" padding="60px 60px 30px 60px">
        <Container maxWidth="1080px" margin="0 auto" padding="30px 60px">
          <Container className="brokerage-hub__header">
            <h2>Broker Portal</h2>
            <Button handler={findServiceUser}>Find a service user</Button>
          </Container>
          <Container className="brokerage-hub__filters">
            <SearchBox
              placeholder="Search"
              label="Search packages"
              handler={setSearchPackages}
              value={searchPackages}
            />
            <FormGroup className="form-group--inline-label brokerage-hub__form-status" label="Status">
              <Select options={statusOptions} value={status} onChange={({ target: { value } }) => setStatus(value)} />
            </FormGroup>
            <FormGroup className="form-group--inline-label brokerage-hub__date-from" label="From">
              <DatePick
                placeholder="Select date"
                startDate={dateFrom}
                dateValue={dateFrom}
                setDate={(value) => {
                  if (value > dateTo) {
                    setDateTo(value);
                  }
                  setDateFrom(value);
                }}
              />
            </FormGroup>
            <FormGroup className="form-group--inline-label" label="To">
              <DatePick
                placeholder="Select date"
                startDate={dateTo}
                dateValue={dateTo}
                minDate={dateFrom}
                setDate={setDateTo}
              />
            </FormGroup>
          </Container>
        </Container>
      </Container>

      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        {data?.packages && <BrokerageHubTable onRowClick={onRowClick} data={data.packages} />}
        <HorizontalSeparator height="20px" />
        <Pagination
          pageSize={data?.pagingMetaData?.pageSize ?? 0}
          totalPages={data?.pagingMetaData?.totalPages ?? 0}
          totalCount={data?.pagingMetaData?.totalCount ?? 0}
          currentPage={pageNumber}
          changePagination={setPageNumber}
        />
      </Container>
    </div>
  );
};

export default BrokerageHub;
