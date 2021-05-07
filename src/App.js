import { Route, Switch } from "react-router-dom";
import CarePackage from "./features/CarePackages/CarePackage";
import DayCare from "./features/CarePackages/DayCare/DayCare";
import HomeCare from "./features/CarePackages/HomeCare/HomeCare";
import ResidentialCare from "./features/CarePackages/ResidentialCare/ResidentialCare";
import NursingCare from "./features/CarePackages/NursingCare/NursingCare";
import ClientHistory from "./features/ClientHistory/ClientHistory";
import Login from "./features/User/Login";
import * as RouteConstants from "./routes/RouteConstants";
import React from "react";
import HomeCareApprovePackage from "./features/CarePackages/HomeCare/HomeCareApprovePackage";
import HomeCareApproveBrokered from "./features/CarePackages/HomeCare/HomeCareApproveBrokered";
import {useSelector} from "react-redux";
import {selectUser} from "./reducers/userReducer";
import ProposedPackages from "./features/ProposedPackages/ProposedPackages";

const App = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <Switch>
        {user === null ?
            <Route path={RouteConstants.LOGIN} component={Login} />
            :
            <>
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
                path={
                `${RouteConstants.RESIDENTIAL_CARE}/:hasRespiteCare/:hasDischargePackage/` +
                `:isImmediateOrReEnablement/:typeOfStayId/:isS117/:startDate/:endDate`
                }
                component={ResidentialCare}
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
                path={RouteConstants.CLIENT_HISTORY}
                component={ClientHistory}
              />
            </>
        }
      </Switch>
    </>
  );
};

export default App;
