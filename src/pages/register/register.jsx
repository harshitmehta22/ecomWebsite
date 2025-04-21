import React from "react";
import './register.css';
import { Link } from "react-router-dom";
const Register = () => {
    return(
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
              <form className="row login_form" noValidate>
                <div className="col-md-12 form-group">
                  <input type="text" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="col-md-12 form-group">
                  <input type="email" className="form-control" placeholder="Email Address" required />
                </div>
                <div className="col-md-12 form-group">
                  <input type="tel" className="form-control" placeholder="Mobile Number" required />
                </div>
                <div className="col-md-12 form-group">
                  <input type="password" className="form-control" placeholder="Password" required />
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