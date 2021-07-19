import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../components/Button";
import HackneyFooterInfo from "../../components/HackneyFooterInfo";
import Header from "../../components/Layout/Header";
import { CARE_PACKAGE_ROUTE } from "../../routes/RouteConstants";

const Login = () => {
  const router = useRouter();

  const login = () => {
    //const baseUrl = window.location.host;
    //debugger;
    //const authUrl = `https://auth.hackney.gov.uk/auth?redirect_uri=${baseUrl}`;
    router.replace(CARE_PACKAGE_ROUTE);
  };

  return (
    <div className="login-page">
      <Header showPageHeader={false} />
      <div className="login-page__form-container">
        <div className="login-page__form">
          <h2>Sign In</h2>
          <p>Please sign in with your Hackney email account.</p>
          <p>Please contact your manager if you have issues signing in.</p>
          <Button onClick={login}>Sign in with Google</Button>
        </div>
      </div>
      <HackneyFooterInfo />
    </div>
  );
};

export default Login;
