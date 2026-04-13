import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('newRegisteredUser');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>No user profile to display</h2>
          <p>Please register first or log in.</p>
          <Link to="/register" className="btn btn-primary">Go to Register</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="section_gap">
        <div className="container">
          <h2>Your Profile</h2>
          <p>Welcome! Here are your registration details.</p>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td>{user.mobile}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <Link to="/" className="btn btn-secondary">Go to Home</Link>
            <button
              className="btn btn-danger ml-2"
              onClick={() => {
                localStorage.removeItem('newRegisteredUser');
                setUser(null);
              }}
            >
              Clear Profile
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;