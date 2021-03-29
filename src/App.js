import { Route, Switch } from "react-router-dom";
import DayCare from "./features/CarePackages/DayCare/DayCare";
import HomeCare from "./features/CarePackages/HomeCare/HomeCare";
import NursingCare from "./features/CarePackages/NursingCare/NursingCare";
import ResidentialCare from "./features/CarePackages/ResidentialCare/ResidentialCare";
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
          path={RouteConstants.CLIENT_HISTORY}
          component={ClientHistory}
        />
        <PrivateRoute path={RouteConstants.HOME_CARE} component={HomeCare} />
        <PrivateRoute
          path={RouteConstants.NURSING_CARE}
          component={NursingCare}
        />
        <PrivateRoute
          path={RouteConstants.RESIDENTIAL_CARE}
          component={ResidentialCare}
        />
        <PrivateRoute path={RouteConstants.DAY_CARE} component={DayCare} />
      </Switch>
    </>
  );
};

export default App;
