import React from "react";
import { Route, Switch } from "react-router-dom";
import CarePackage from "./features/CarePackages/CarePackage";
import DayCare from "./features/CarePackages/DayCare/DayCare";
import HomeCare from "./features/CarePackages/HomeCare/HomeCare";
import ResidentialCare from "./features/CarePackages/ResidentialCare/ResidentialCare";
import NursingCare from "./features/CarePackages/NursingCare/NursingCare";
import ClientHistory from "./features/ClientHistory/ClientHistory";
import Login from "./features/User/Login";
import * as RouteConstants from "./routes/RouteConstants";
import HomeCareApprovePackage from "./features/CarePackages/HomeCare/HomeCareApprovePackage";
import HomeCareApproveBrokered from "./features/CarePackages/HomeCare/HomeCareApproveBrokered";
import DayCareApprovePackage from "./features/CarePackages/DayCare/DayCareApprovePackage";
import DayCareApproveBrokered from "./features/CarePackages/DayCare/DayCareApproveBrokered";
import ResidentialCareApprovePackage from "./features/CarePackages/ResidentialCare/ResidentialCareApprovePackage";
import ResidentialCareApproveBrokered from "./features/CarePackages/ResidentialCare/ResidentialCareApproveBrokered";
import NursingCareApprovePackage from "./features/CarePackages/NursingCare/NursingCareApprovePackage";
import NursingCareApproveBrokered from "./features/CarePackages/NursingCare/NursingCareApproveBrokered";
import { useSelector } from "react-redux";
import { selectUser } from "./reducers/userReducer";
import ProposedPackages from "./features/ProposedPackages/ProposedPackages";
import DayCareBrokering from "./features/CarePackages/DayCare/DayCareBrokering";
import PaymentsHeader from "./features/Payments/components/PaymentsHeader";
import PayRuns from "./features/PayRuns/PayRuns";
import PayRun from "./features/PayRuns/PayRun";
import Bills from "./features/Bills/Bills";
import Bill from "./features/Bills/Bill";
import SupplierDashboardHeader from "./features/Supplier/components/SupplierDashboardHeader";
import SupplierDashboard from "./features/SupplierDashboard/SupplierDashboard";
import SupplierReturnsDashboard from "./features/SupplierDashboard/SupplierReturnsDashboard";
import SupplierReturns from "./features/SupplierReturns/SupplierReturns";
import SupplierReturn from "./features/SupplierReturns/SupplierReturn";
import WeekOfSupplierView from "./features/SupplierReturns/WeekOfSupplierView";
import AddBill from "./features/Bills/AddBill";

const exactRoutes = [
  {
    path: RouteConstants.SUPPLIER_DASHBOARD_ROUTE,
    component: SupplierDashboard,
  },
  {
    path: RouteConstants.SUPPLIER_RETURNS_DASHBOARD_ROUTE,
    component: SupplierReturnsDashboard,
  },

  { path: RouteConstants.PAYMENTS_RECLAIMS_ROUTE, component: SupplierReturns },
  {
    path: RouteConstants.PAYMENTS_WEEK_OF_SUPPLIER_ROUTE,
    component: WeekOfSupplierView,
  },
  { path: RouteConstants.PAYMENTS_RECLAIM_ROUTE, component: SupplierReturn },
  { path: RouteConstants.PAYMENTS_BILL_ROUTE, component: Bill },
  { path: RouteConstants.PAYMENTS_ADD_BILL_ROUTE, component: AddBill },
  { path: RouteConstants.PAYMENTS_BILLS_ROUTE, component: Bills },
  { path: RouteConstants.PAYMENTS_PAY_RUNS_ROUTE, component: PayRuns },
  { path: RouteConstants.PAYMENTS_PAY_RUN_ROUTE, component: PayRun },

  { path: RouteConstants.CARE_PACKAGE, component: CarePackage },
  { path: RouteConstants.PROPOSED_PACKAGES, component: ProposedPackages },

  {
    path: RouteConstants.HOME_CARE_APPROVE_BROKERED,
    component: HomeCareApproveBrokered,
  },
  {
    path: RouteConstants.HOME_CARE_APPROVE_PACKAGE,
    component: HomeCareApprovePackage,
  },
  {
    path: RouteConstants.HOME_CARE_APPROVE_BROKERED,
    component: HomeCareApproveBrokered,
  },
  {
    path: `${RouteConstants.HOME_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate/:endDate`,
    component: HomeCare,
  },

  {
    path: `${RouteConstants.DAY_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate`,
    component: DayCare,
  },
  {
    path: RouteConstants.DAY_CARE_APPROVE_PACKAGE,
    component: DayCareApprovePackage,
  },
  {
    path: RouteConstants.DAY_CARE_APPROVE_BROKERED,
    component: DayCareApproveBrokered,
  },
  {
    path: RouteConstants.DAY_CARE_BROKERING_PACKAGE,
    component: DayCareBrokering,
  },

  {
    path:
      `${RouteConstants.RESIDENTIAL_CARE}/:hasRespiteCare/:hasDischargePackage/` +
      `:isImmediateOrReEnablement/:typeOfStayId/:isS117/:startDate/:endDate`,
    component: ResidentialCare,
  },
  {
    path: RouteConstants.RESIDENTIAL_CARE_APPROVE_PACKAGE,
    component: ResidentialCareApprovePackage,
  },
  {
    path: RouteConstants.RESIDENTIAL_CARE_APPROVE_BROKERED,
    component: ResidentialCareApproveBrokered,
  },

  {
    path:
      `${RouteConstants.NURSING_CARE}/:isFixedPeriod/:startDate/:typeOfStayId/` +
      `:hasRespiteCare/:hasDischargePackage/:isThisAnImmediateService/:isThisUserUnderS117/:endDate`,
    component: NursingCare,
  },
  {
    path: RouteConstants.NURSING_CARE_APPROVE_PACKAGE,
    component: NursingCareApprovePackage,
  },
  {
    path: RouteConstants.NURSING_CARE_APPROVE_BROKERED,
    component: NursingCareApproveBrokered,
  },

  { path: RouteConstants.CLIENT_HISTORY, component: ClientHistory },
];

const App = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <PaymentsHeader />
      <SupplierDashboardHeader />
      <Switch>
        {!!user === null ? (
          <Route path={RouteConstants.LOGIN} component={Login} />
        ) : (
          exactRoutes.map((route) => (
            <Route
              key={route.path}
              exact
              path={route.path}
              component={route.component}
            />
          ))
        )}
      </Switch>
    </>
  );
};

export default App;
