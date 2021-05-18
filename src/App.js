import React from "react";
import {Route, Switch} from "react-router-dom";
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
import PaymentsHeader from "./features/Payments/components/PaymentsHeader";
import PayRuns from "./features/PayRuns/PayRuns";
import PayRun from "./features/PayRuns/PayRun";
import Bills from "./features/Bills/Bills";
import Bill from "./features/Bills/Bill";
import SupplierDashboardHeader from "./features/Supplier/components/SupplierDashboardHeader";
import SupplierDashboard from "./features/SupplierDashboard/SupplierDashboard";

const App = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <PaymentsHeader />
      <SupplierDashboardHeader />
      <Switch>
        {user !== null ? (
          <Route path={RouteConstants.LOGIN} component={Login} />
        ) : (
          <>
            <Route
              exact
              path={RouteConstants.HOME_CARE_APPROVE_PACKAGE}
              component={HomeCareApprovePackage}
            />
            <Route
              exact
              path={RouteConstants.PAYMENTS_BILLS_ROUTE}
              component={Bills}
            />
            <Route
              exact
              path={RouteConstants.SUPPLIER_DASHBOARD_ROUTE}
              component={SupplierDashboard}
            />
            <Route
              exact
              path={RouteConstants.PAYMENTS_BILL_ROUTE}
              component={Bill}
            />
            <Route
              exact
              path={RouteConstants.PAYMENTS_PAY_RUNS_ROUTE}
              component={PayRuns}
            />
            <Route
              exact
              path={RouteConstants.PAYMENTS_PAY_RUN_ROUTE}
              component={PayRun}
            />
            <Route
              exact
              path={RouteConstants.HOME_CARE_APPROVE_BROKERED}
              component={HomeCareApproveBrokered}
            />
            <Route
              exact
              path={RouteConstants.CARE_PACKAGE}
              component={CarePackage}
            />
            <Route
              exact
              path={RouteConstants.PROPOSED_PACKAGES}
              component={ProposedPackages}
            />
            <Route
              exact
              path={RouteConstants.HOME_CARE_APPROVE_PACKAGE}
              component={HomeCareApprovePackage}
            />
            <Route
              exact
              path={RouteConstants.HOME_CARE_APPROVE_BROKERED}
              component={HomeCareApproveBrokered}
            />
            <Route
              exact
              path={`${RouteConstants.HOME_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate/:endDate`}
              component={HomeCare}
            />
            <Route
              exact
              path={`${RouteConstants.DAY_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate`}
              component={DayCare}
            />
            <Route
              exact
              path={RouteConstants.DAY_CARE_APPROVE_PACKAGE}
              component={DayCareApprovePackage}
            />
            <Route
              exact
              path={RouteConstants.DAY_CARE_APPROVE_BROKERED}
              component={DayCareApproveBrokered}
            />
            <Route
              exact
              path={
                `${RouteConstants.RESIDENTIAL_CARE}/:hasRespiteCare/:hasDischargePackage/` +
                `:isImmediateOrReEnablement/:typeOfStayId/:isS117/:startDate/:endDate`
              }
              component={ResidentialCare}
            />
            <Route
              exact
              path={RouteConstants.RESIDENTIAL_CARE_APPROVE_PACKAGE}
              component={ResidentialCareApprovePackage}
            />
            <Route
              exact
              path={RouteConstants.RESIDENTIAL_CARE_APPROVE_BROKERED}
              component={ResidentialCareApproveBrokered}
            />
            <Route
              exact
              path={
                `${RouteConstants.NURSING_CARE}/:isFixedPeriod/:startDate/:typeOfStayId/` +
                `:hasRespiteCare/:hasDischargePackage/:isThisAnImmediateService/:isThisUserUnderS117/:endDate`
              }
              component={NursingCare}
            />
            <Route
              exact
              path={RouteConstants.NURSING_CARE_APPROVE_PACKAGE}
              component={NursingCareApprovePackage}
            />
            <Route
              exact
              path={RouteConstants.NURSING_CARE_APPROVE_BROKERED}
              component={NursingCareApproveBrokered}
            />
            <Route
              path={RouteConstants.CLIENT_HISTORY}
              component={ClientHistory}
            />
          </>
        )}
      </Switch>
    </>
  );
};

export default App;
