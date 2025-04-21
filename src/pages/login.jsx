import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
              <form className="row login_form" noValidate>
                <div className="col-md-12 form-group">
                  <input type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="col-md-12 form-group">
                  <input type="password" className="form-control" placeholder="Password" />
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