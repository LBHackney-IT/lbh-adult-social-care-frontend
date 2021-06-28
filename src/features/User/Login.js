import React from "react";
import {Button} from "../components/Button";
import Header from "../Layout/Header";
import HackneyFooterInfo from "../components/HackneyFooterInfo";

const Login = () => {

  return (
    <div className='login-page'>
      <Header showPageHeader={false} />
      <div className='login-page__form-container'>
        <div className='login-page__form'>
          <h2>Sign In</h2>
          <p>Please sign in with your Hackney email account.</p>
          <p>Please contact your manager if you have issues signing in.</p>
          <Button>Sign in with Google</Button>
        </div>
      </div>
      <HackneyFooterInfo />
    </div>
  );
};

export default Login;
