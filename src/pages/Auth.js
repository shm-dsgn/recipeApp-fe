import React, { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const Auth = () => {
  return (
    <div className="flex justify-evenly items-center flex-col mt-4">
      <Login />
      <Register />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post("https://recipeapp-api.onrender.com/auth/register", {
          username,
          password,
        })
        .then(function (res) {
          alert(res.data.message);
        });
      //alert("Registration successfull. Now Login.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      label={"Register"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios
        .post("https://recipeapp-api.onrender.com/auth/login", {
          username,
          password,
        })
        
        setCookies('access_token', response.data.token)
        window.localStorage.setItem('userID', response.data.userID)
        navigate('/')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      label={"Login"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className=" w-64 m-2 p-4 bg-gray-300">
      <h2 className="font-bold">{label}</h2>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col justify-start my-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </div>
        <div className="flex flex-col justify-start my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className=" border-2 bg-black text-white rounded-md px-4 py-2"
        >
          {label}
        </button>
      </form>
    </div>
  );
};

export default Auth;
