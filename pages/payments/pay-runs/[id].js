import React, {useEffect, useState} from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useRouter } from 'next/router';
import PayRunTable from "../../../components/PayRuns/PayRunTable";
import Pagination from "../../../components/Payments/Pagination";
import {payRunTableData} from "../../../testData/testDataPayRuns";
import PopupCreatePayRun from "../../../components/PayRuns/PopupCreatePayRun";
import PayRunsLevelInsight from "../../../components/PayRuns/PayRunsLevelInsight";
import PayRunHeader from "../../../components/PayRuns/PayRunHeader";
import PopupHoldPayment from "../../../components/PayRuns/PopupHoldPayment";
import HackneyFooterInfo from "../../../components/HackneyFooterInfo";
import {getUserSession} from "../../../service/helpers";
import withSession from "../../../lib/session";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return {
      props: { user },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
});

const PayRunPage = (props) => {
  const [sorts] = useState([
    {name: 'serviceUser', text: 'Service User'},
    {name: 'invId', text: 'INV ID'},
    {name: 'packageType', text: 'Package Type'},
    {name: 'supplier', text: 'SupplierDashboard'},
    {name: 'total', text: 'Total'},
    {name: 'status', text: 'Status'},
  ]);

  const popupTypes = useState({
    createPayRun: 'create-pay-run',
    holdPayments: 'hold-payment',
  });

  const router = useRouter();
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [reason, setReason] = useState('');
  const id = router.pathname.replace('/payments/pay-runs/', '');
  const [date, setDate] = useState(new Date());
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');

  const [headerOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
    },
  });

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Payments', onClick: () => router.push('/payments/pay-runs')},
    {text: `Pay Run ${id}`}
  ]);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'serviceUser',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    setReason('');
    setActionRequiredBy('');
  };

  const onCheckRow = (id) => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => String(item) !== String(id)));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const actionButton = {
    classes: 'outline green',
    onClick: () => console.log('Accept all selected', checkedRows),
    text: 'Accept all selected',
  }

  useEffect(() => {
    router.replace(`${router.pathname}?page=1`);
  }, []);

  useEffect(() => {
    if(router?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => router.push(`${value.route}`)},
        {text: `Pay Run ${router.query.id}`}
      ]);
    }
  }, []);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className='pay-runs pay-run'>
      {openedPopup === popupTypes.holdPayments &&
        <PopupHoldPayment
          reason={reason}
          actionRequiredBy={actionRequiredBy}
          actionRequiredByOptions={[{text: 'Brokerage', value: 'brokerage'}, {text: 'Testage', value: 'testage'}]}
          changeActionRequiredBy={(value) => setActionRequiredBy(value)}
          closePopup={closeCreatePayRun}
          changeReason={value => setReason(value)}
        />
      }
      {openedPopup === popupTypes.createPayRun &&
      <PopupCreatePayRun
        changeHocAndRelease={changeHocAndRelease}
        changeRegularCycles={changeRegularCycles}
        hocAndRelease={hocAndRelease}
        regularCycles={regularCycles}
        closePopup={closeCreatePayRun}
        date={date}
        setDate={setDate}
      />
      }
      {!!breadcrumbs.length && <Breadcrumbs classes='p-3' values={breadcrumbs} />}
      <PayRunHeader
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <PayRunTable
        rows={payRunTableData}
        careType='Residential'
        isStatusDropDown={true}
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        isIgnoreId={true}
        canCollapseRows={true}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
      <PayRunsLevelInsight
        firstButton={{
          text: 'Submit pay run for approval',
          onClick: () => {}
        }}
        secondButton={{
          text: 'Delete draft pay run',
          onClick: () => {},
        }}
        cost='£42,827'
        suppliersCount='100'
        servicesUsersCount='1000'
        costIncrease='£897'
        holdsCount='48'
        holdsPrice='£32,223'
      />
      <HackneyFooterInfo />
    </div>
  )
};

export default PayRunPage;
