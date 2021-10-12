import React from 'react';
import { useRouter } from 'next/router';
import PaymentsHeader from './Payments/PaymentsHeader';
import {
  PAYMENTS_ROUTE,
  APPROVER_HUB_ROUTE,
  SOCIAL_WORKER_ROUTE,
  SUPPLIER_DASHBOARD_ROUTE,
} from '../routes/RouteConstants';
import SupplierDashboardHeader from './Supplier/SupplierDashboardHeader';
import ApproverHeader from './Approver/ApproverHeader';

const AdditionalHeader = () => {
  const router = useRouter();
  const headers = [
    { route: PAYMENTS_ROUTE, component: <PaymentsHeader /> },
    { route: SUPPLIER_DASHBOARD_ROUTE, component: <SupplierDashboardHeader /> },
    { route: SOCIAL_WORKER_ROUTE, component: <ApproverHeader /> },
    { route: APPROVER_HUB_ROUTE, component: <ApproverHeader /> },
  ];
  const header = headers.find((headerProps) => router.pathname.indexOf(headerProps.route) > -1);
  return <>{header?.component}</>;
};

export default AdditionalHeader;
