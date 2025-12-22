import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { login } from "../../api/auth.api";
import axiosClient from "../../api/axiosClient";

import GoogleLogo from "../../images/googleLogo.png";
import UserContext from "../../context/userContext";

import "./login.css";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // FORM HANDLERS
  function handleChange(event) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await login(data);

      const {
        accessToken,
        refreshToken,
        roles,
        username,
        email,
      } = response.data;

      userContext.login(
        accessToken,
        roles,
        username,
        email,
        refreshToken
      );

      if (roles.includes("Role:ADMIN")) {
        navigate("/admindashboard", { replace: true });
      } else {
        navigate("/userdashboard", { replace: true });
      }

    } catch (error) {
      localStorage.clear();

      const message =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      alert(message);
    }
  }

  // GOOGLE LOGIN
  const handleLogin = async (googleData) => {
    try {
      const response = await axiosClient.post("/users/glogin", {
        token: googleData.tokenId,
      });

      const {
        accessToken,
        refreshToken,
        roles,
        username,
        email,
      } = response.data;

      userContext.login(
        accessToken,
        roles,
        username,
        email,
        refreshToken
      );

      navigate("/userdashboard", { replace: true });

    } catch (error) {
      localStorage.clear();
      alert("You are not an employee of the company!");
    }
  };

  const handleFailure = () => {
    alert("Google login failed. Please try again.");
  };

  return (
    <div id="main-wrapper" className="min-vh-99 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center w-100">
          <div className="col-xl-12">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-4 loginContent">
                      <br />
                      <br />
                      <br />
                      <br />
                      <h3
                        className="h5 mb-2"
                        style={{ fontSize: "30px", fontFamily: "Roboto" }}
                      >
                        Welcome back
                      </h3>

                      <div className="mb-4">
                        <h1
                          className="h4 font-weight-bold text-theme mb-4"
                          style={{
                            marginTop: "5px",
                            fontSize: "60px",
                            fontFamily: "Roboto",
                            color: "#2C2424",
                          }}
                        >
                          Login
                        </h1>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="userTextFeild"
                          />
                        </div>
                        <br />

                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="password"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <br />
                        <button type="submit" className="btntheme">
                          Login
                        </button>

                        <br />
                        <p className="orDivider">OR</p>
                      </form>
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        render={(renderProps) => (
                          <button
                            onClick={renderProps.onClick}
                            className="signIn"
                          >
                            <img
                              className="microsoftLogo"
                              src={GoogleLogo}
                              alt="logo"
                            ></img>{" "}
                            Sign In
                          </button>
                        )}
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                      ></GoogleLogin>
                    </div>
                  </div>
                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right" />
                      <div className="account-testimonial">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
