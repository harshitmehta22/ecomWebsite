import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login successful:", response.data);
      // Store token or user info if needed
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      navigate("/"); // Navigate to a protected page
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };
  return (
    <section className="login_box_area full-height d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="login_box_img">
              <img className="img-fluid" src="img/login.jpg" alt="login" />
              <div className="hover">
                <h4>New to our website?</h4>
                <p>There are advances being made in science and technology every day. A good example of this is here.</p>
                <Link className="primary-btn" to="/register">Create an Account</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login_form_inner">
              <h3>Log in to enter</h3>
              <form className="row login_form" noValidate onSubmit={handleLogin}>
                <div className="col-md-12 form-group">
                  <input type="text" className="form-control" placeholder="Email" name="email" onChange={handleChange} value={formData.email} />
                </div>
                <div className="col-md-12 form-group">
                  <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} value={formData.password} />
                </div>
                <div className="col-md-12 form-group">
                  <div className="creat_account">
                    <input type="checkbox" id="keep_logged_in" />
                    <label htmlFor="keep_logged_in">Keep me logged in</label>
                  </div>
                </div>
                <div className="col-md-12 form-group">
                  <button type="submit" className="primary-btn">Log In</button>
                  <a href="#" className="ml-3">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;