import Input from "../components/Input";
import React, {useState} from "react";
import {Button} from "../components/Button";

const Login = () => {
  const initialLoginData = {
    userName: '',
    password: '',
  };

  const [loginData, setLoginData] = useState({...initialLoginData});

  const onChangeLoginData = (data, field) => {
    setLoginData({
      ...initialLoginData,
      [field]: data,
    })
  }

  return (
    <div className='login-page'>
      <Input onChange={userName => onChangeLoginData(userName, 'userName')} placeholder='User name' value={loginData.userName} />
      <Input onChange={password => onChangeLoginData(password, 'password')} placeholder='Password' value={loginData.password} />
      <Button>Login</Button>
    </div>
  );
};

export default Login;
