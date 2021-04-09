import { Route, Switch } from "react-router-dom";
import CarePackage from "./features/CarePackages/CarePackage";
import DayCare from "./features/CarePackages/DayCare/DayCare";
import HomeCare from "./features/CarePackages/HomeCare/HomeCare";
import ClientHistory from "./features/ClientHistory/ClientHistory";
import Login from "./features/User/Login";
import PrivateRoute from "./routes/PrivateRoute";
import * as RouteConstants from "./routes/RouteConstants";

const App = () => {
  const carePackageParams =
    "/:isImmediate/:isS117/:isFixedPeriod/:startDate/:endDate";

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
          path={`${RouteConstants.HOME_CARE}${carePackageParams}`}
          component={HomeCare}
        />
        <PrivateRoute
          exact
          path={RouteConstants.DAY_CARE}
          component={DayCare}
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
