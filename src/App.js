import { Route, Switch } from "react-router-dom";
import CarePackage from "./features/CarePackages/CarePackage";
import HomeCare from "./features/CarePackages/HomeCare/HomeCare";
import ClientHistory from "./features/ClientHistory/ClientHistory";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./features/User/Login";
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
          path={RouteConstants.HOME_CARE + carePackageParams}
          component={HomeCare}
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
