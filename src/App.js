import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./features/User/Login";
import * as RouteConstants from "./routes/RouteConstants";
import { useSelector } from "react-redux";
import { selectUser } from "./reducers/userReducer";
import PaymentsHeader from "./features/Payments/components/PaymentsHeader";
import SupplierDashboardHeader from "./features/Supplier/components/SupplierDashboardHeader";
import {exactRoutes} from "./routes/routes";

const App = () => {
  const user = {}; // useSelector(selectUser);

  return (
    <>
      <PaymentsHeader />
      <SupplierDashboardHeader />
      <Switch>
        {user === null ?
          <Route path={RouteConstants.LOGIN} component={Login} />
          :
          exactRoutes.map(route => {
            return (
              <Route
                key={route.path}
                exact
                path={route.path}
                component={route.component}
              />
            )
          })
        }
      </Switch>
    </>
  );
};

export default App;
