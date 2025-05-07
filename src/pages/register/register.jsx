import React, { useState } from "react";
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

let socket;
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: ''
  });
  
  const navigate = useNavigate();
  
  React.useEffect(() => {
    socket = io('http://localhost:5000', {
      transports: ['websocket']
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      }
      socket.emit('sendNotification', {
        message: `New user signed up: ${formData.username}`,
        username: formData.username,
        email: formData.email,
        role: 'User'
      });
     

    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong! Please try again.");
    }
  };
  return (
    <>
      <section className="login_box_area full-height d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="login_box_img">
                <img className="img-fluid" src="img/login.jpg" alt="login" />
                <div className="hover">
                  <h4>New to our website?</h4>
                  <p>There are advances being made in science and technology every day. A good example of this is here.</p>
                  <Link className="primary-btn" to="/login">Login </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login_form_inner">
                <h3>Create an Account</h3>
                <form className="row login_form" noValidate onSubmit={handleSubmit}>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <button type="submit" className="primary-btn">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Register;