import { Route, Switch } from "react-router-dom";
import CarePackage from "./features/CarePackages/CarePackage";
import DayCare from "./features/CarePackages/DayCare/DayCare";
import HomeCare from "./features/CarePackages/HomeCare/HomeCare";
import ResidentialCare from "./features/CarePackages/ResidentialCare/ResidentialCare";
import NursingCare from "./features/CarePackages/NursingCare/NursingCare";
import ClientHistory from "./features/ClientHistory/ClientHistory";
import Login from "./features/User/Login";
import PrivateRoute from "./routes/PrivateRoute";
import * as RouteConstants from "./routes/RouteConstants";
import React from "react";
import HomeCareApprovePackage from "./features/CarePackages/HomeCare/HomeCareApprovePackage";
import HomeCareApproveBrokered from "./features/CarePackages/HomeCare/HomeCareApproveBrokered";
import DayCareApprovePackage from "./features/CarePackages/DayCare/DayCareApprovePackage";
import DayCareApproveBrokered from "./features/CarePackages/DayCare/DayCareApproveBrokered";
import ResidentialCareApprovePackage from "./features/CarePackages/ResidentialCare/ResidentialCareApprovePackage";
import ResidentialCareApproveBrokered from "./features/CarePackages/ResidentialCare/ResidentialCareApproveBrokered";
import NursingCareApprovePackage from "./features/CarePackages/NursingCare/NursingCareApprovePackage";
import NursingCareApproveBrokered from "./features/CarePackages/NursingCare/NursingCareApproveBrokered";

const App = () => {
  return (
    <>
      <Switch>
        <Route path={RouteConstants.LOGIN} component={Login} />
        <PrivateRoute
          exact
          path={RouteConstants.CARE_PACKAGE}
          component={CarePackage}
        />
        <PrivateRoute
          exact
          path={RouteConstants.HOME_CARE_APPROVE_PACKAGE}
          component={HomeCareApprovePackage}
        />
        <PrivateRoute
          exact
          path={RouteConstants.HOME_CARE_APPROVE_BROKERED}
          component={HomeCareApproveBrokered}
        />
        <PrivateRoute
          exact
          path={`${RouteConstants.HOME_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate/:endDate`}
          component={HomeCare}
        />
        <PrivateRoute
          exact
          path={`${RouteConstants.DAY_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate`}
          component={DayCare}
        />
        <PrivateRoute
          exact
          path={RouteConstants.DAY_CARE_APPROVE_PACKAGE}
          component={DayCareApprovePackage}
        />
        <PrivateRoute
          exact
          path={RouteConstants.DAY_CARE_APPROVE_BROKERED}
          component={DayCareApproveBrokered}
        />
        <PrivateRoute
          exact
          path={
            `${RouteConstants.RESIDENTIAL_CARE}/:hasRespiteCare/:hasDischargePackage/` +
            `:isImmediateOrReEnablement/:typeOfStayId/:isS117/:startDate/:endDate`
          }
          component={ResidentialCare}
        />
        <PrivateRoute
          exact
          path={RouteConstants.RESIDENTIAL_CARE_APPROVE_PACKAGE}
          component={ResidentialCareApprovePackage}
        />
        <PrivateRoute
          exact
          path={RouteConstants.RESIDENTIAL_CARE_APPROVE_BROKERED}
          component={ResidentialCareApproveBrokered}
        />
        <PrivateRoute
          exact
          path={
            `${RouteConstants.NURSING_CARE}/:isFixedPeriod/:startDate/:typeOfStayId/` +
            `:hasRespiteCare/:hasDischargePackage/:isThisAnImmediateService/:isThisUserUnderS117/:endDate`
          }
          component={NursingCare}
        />
        <PrivateRoute
          exact
          path={RouteConstants.NURSING_CARE_APPROVE_PACKAGE}
          component={NursingCareApprovePackage}
        />
        <PrivateRoute
          exact
          path={RouteConstants.NURSING_CARE_APPROVE_BROKERED}
          component={NursingCareApproveBrokered}
        />
        <PrivateRoute
          path={RouteConstants.CLIENT_HISTORY}
          component={ClientHistory}
        />
      </Switch>
    </>
  );
};

export default App;
