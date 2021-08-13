import React from 'react';
import { useRouter } from 'next/router';
import PaymentsHeader from './Payments/PaymentsHeader';
import { SUPPLIER_DASHBOARD_ROUTE } from '../routes/RouteConstants';
import SupplierDashboardHeader from './Supplier/SupplierDashboardHeader';
import ApproverHeader from './Approver/ApproverHeader';

const AdditionalHeader = () => {
  const router = useRouter();
  const headers = [
    { route: 'payments', component: <ApproverHeader /> || <PaymentsHeader /> },
    { route: SUPPLIER_DASHBOARD_ROUTE, component: <SupplierDashboardHeader /> },
    { route: 'social-worker', component: <ApproverHeader /> },
    { route: 'approver-hub', component: <ApproverHeader /> },
    { route: 'brokerage-hub', component: <ApproverHeader /> },
  ];
  const header = headers.find((headerProps) => router.pathname.indexOf(headerProps.route) > -1);
  return <>{header?.component}</>;
};

export default AdditionalHeader;
