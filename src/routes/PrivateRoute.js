import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectUser } from "../features/User/userSlice";

const PrivateRoute = ({ component: Component, ...props }) => {
  const user = useSelector(selectUser);
  // TODO fix
  const authed = true || user !== null;

  const Render = (props) =>
    authed === true ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    );

  return <Route render={Render} {...props} />;
};

export default PrivateRoute;
