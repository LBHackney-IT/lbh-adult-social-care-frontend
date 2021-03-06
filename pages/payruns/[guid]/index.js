import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withSession from 'lib/session';
import { formatDate, getLoggedInUser } from 'service';
import { Breadcrumbs, Container, Heading, HorizontalSeparator, InsetText, Loading } from 'components';
import { useRouter } from 'next/router';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { useInvoiceListView, getPayrunInsight } from 'api/SWR/payRuns';
import AlternativePagination from 'components/AlternativePagination';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';
import { InvoiceFilters } from 'components/Pages/Payruns/SinglePayRun/InvoiceFilters';
import { HighLevelInsight } from 'components/Pages/Payruns/HighLevelInsight';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes, userRoles } from '../../api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.PAYRUNS_GUID)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const initialFilters = {
  packageType: '',
  invoiceStatus: '',
  searchTerm: '',
  fromDate: null,
  toDate: null,
};

const SinglePayRun = ({ roles }) => {
  const router = useRouter();
  const { guid: payRunId } = router.query;
  const isApprover = roles.includes(userRoles.ROLE_FINANCE_APPROVER);
  const [payRunItems, setPayRunItems] = useState([]);
  const [pagingMetaData, setPagingMetaData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const clearFilters = useCallback(() => setFilters(initialFilters), []);
  const { packageType, invoiceStatus, searchTerm, fromDate, toDate } = filters;
  const params = useMemo(
    () => ({
      packageType,
      invoiceStatus,
      searchTerm,
      fromDate,
      toDate,
      pageNumber,
    }),
    [filters, pageNumber]
  );

  const { data: payRun, isLoading: invoiceLoading, mutate: updateInvoices } = useInvoiceListView({ payRunId, params });
  const { payRunItems: payRunData } = payRun;

  const { data: insightData, isLoading: insightsIsLoading, mutate: updateInsight } = getPayrunInsight({ payRunId });

  useEffect(() => {
    if (payRunData) {
      setPayRunItems(payRunData.data);
      setPagingMetaData(payRunData.pagingMetaData);
    }
  }, [payRunData]);

  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Finance', href: FINANCE_ROUTE },
    { text: `Pay Run ${payRun?.payRunNumber}` },
  ];

  const updateData = () => {
    updateInvoices();
    updateInsight();
  };

  const isLoading = invoiceLoading || insightsIsLoading;

  return (
    <Container>
      <NewHeader roles={roles ?? []} />
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Heading size="xl">Pay Run {payRun?.payRunNumber}</Heading>
          <HorizontalSeparator height="16px" />
          <InvoiceFilters filters={filters} setFilters={setFilters} clearFilter={clearFilters} />
        </Container>
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px">
        <Loading isLoading={isLoading} />
        {!payRunItems || (payRunItems.length === 0 && <InsetText>No invoices found</InsetText>)}
        {payRunItems &&
          payRunItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <PayRunItem
                payRunId={payRunId}
                searchTerm={searchTerm}
                updateData={updateData}
                item={item}
                index={index}
                isActivePayRun={[1, 2, 3, 4].includes(payRun?.payRunStatus)}
              />
              {index < payRunItems.length - 1 && <HorizontalSeparator height="32px" />}
            </React.Fragment>
          ))}
        <HorizontalSeparator height="32px" />
        {insightData && (
          <HighLevelInsight
            updateData={updateData}
            payRunId={payRunId}
            payRunNumber={payRun?.payRunNumber}
            holdCount={insightData?.holdsCount}
            paidBy={insightData?.paidBy}
            paidOn={insightData?.paidOn && formatDate(insightData.paidOn)}
            holdValue={insightData?.totalHeldAmount}
            difference={insightData?.totalDifferenceFromLastCycle}
            serviceUsers={insightData?.serviceUserCount}
            suppliers={insightData?.supplierCount}
            total={insightData?.totalInvoiceAmount}
            status={insightData?.payRunStatus}
            hasInvoices={!!payRunItems?.length}
            isCedarFileDownloaded={insightData?.isCedarFileDownloaded}
            insightDataLoading={insightsIsLoading}
            isApprover={isApprover}
          />
        )}
        <HorizontalSeparator height="32px" />
        <AlternativePagination
          totalPages={pagingMetaData.totalPages}
          totalCount={pagingMetaData.totalCount}
          pageSize={pagingMetaData.pageSize}
          currentPage={pageNumber}
          changePagination={setPageNumber}
        />
      </Container>
    </Container>
  );
};

export default SinglePayRun;
