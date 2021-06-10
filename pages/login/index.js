import React from "react";
import Input from "../../components/Input";
import {Button} from "../../components/Button";
import {useRouter} from "next/router";

const Login = () => {
  const router = useRouter();

  const login = () => {
    router.replace('/care-package');
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
