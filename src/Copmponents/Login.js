import React, { useState } from "react";
// import axios from 'axios';
// import '../css/main.css';
// import '../css/addform.css';
import { useNavigate } from "react-router-dom";
// import '../images/background.img';

async function LoginUser(cred) {
  console.log(cred);

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(cred),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

//    // 'Authorization': `bearer ${token}`,

export default function Login(props) {
  const handleUserOnChange = (event) => {
    setCred((prevState) => ({ ...prevState, username: event.target.value }));
  };

  const handlePassOnChange = (e) => {
    setCred((prevState) => ({ ...prevState, password: e.target.value }));
  };

  const [cred, setCred] = useState({ username: "", password: "" });
  console.log(cred);


  let nevigate = useNavigate();

  const loginClick = async (e) => {
    e.preventDefault();

    const res = await LoginUser(cred);
    console.log(res);
    props.setToken(res);

    if (!!res.token) {
      let path = "/dashboard";
      nevigate(path);
      
    } else {
      alert("Bad Credentials");
    }
  };

  return (
    <div className="main">
      <div className="login-bg">
        <div className="formtitle">
          <h2>Log In</h2>
        </div>

        <form id="form1" className="userdetailsform">
          <div className="userdetails">
            <div className="form-field">
              <input
                value={cred.username}
                type="text"
                id="username"
                onChange={handleUserOnChange}
                placeholder="User Name"
              />
              <small id="small"></small>
            </div>

            <div className="form-field">
              <input
                value={cred.password}
                type="email"
                id="password"
                onChange={handlePassOnChange}
                placeholder="Password"
              />
              <small></small>
            </div>

            <div className="form-field">
              <input
                type="button"
                className="button"
                id="login"
                value="Log In"
                onClick={loginClick}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
