import React from "react";
import Input from "../../components/Input";
import {Button} from "../../components/Button";
import {useRouter} from "next/router";
import { CARE_PACKAGE_ROUTE } from "../../routes/RouteConstants";

const Login = () => {
  const router = useRouter();

  const login = () => {
    router.replace(CARE_PACKAGE_ROUTE);
  };

  return (
    <div className='login'>
      <Input type='text' classes='login__username mb-3' placeholder='Username' />
      <Input type='password' classes='login__password mb-5' placeholder='Password' />
      <Button onClick={login} className='login__action-button'>Login</Button>
    </div>
  );
};

export default Login;
