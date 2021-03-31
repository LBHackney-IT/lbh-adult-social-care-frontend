import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectUser } from "../features/User/userSlice";
import { CARE_PACKAGE } from "./RouteConstants";

const PrivateRoute = ({ exact = false, component: Component, ...props }) => {
  const user = useSelector(selectUser);
  // TODO fix
  const authed = true || user !== null;

  const Render = (props) =>
    authed === true ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{ pathname: CARE_PACKAGE, state: { from: props.location } }}
      />
    );

  return <Route exact={exact} render={Render} {...props} />;
};

export default PrivateRoute;
