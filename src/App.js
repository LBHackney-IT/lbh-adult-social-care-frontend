import { Route, Switch } from "react-router-dom";
import CarePackage from "./features/CarePackages/CarePackage";
import ClientHistory from "./features/ClientHistory/ClientHistory";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./features/User/Login";
import * as RouteConstants from "./routes/RouteConstants";

const App = () => {
  return (
    <>
      <Switch>
        <Route path={RouteConstants.LOGIN} component={Login} />
        <PrivateRoute
          path={RouteConstants.CARE_PACKAGE}
          component={CarePackage}
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
