import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";


export const Navbar = ({ logout, auth: { isAuthenticated, user } }) => {
const [alert,setAlert ]=useState(true)
  return (
    <div>

    <div className="alert bg-light d-flex  justify-content-between px-3 pb-1 shadow mb-0">
              <div className="font-weight-bold mb-2 pt-1  ">Safe Chat</div>
        {isAuthenticated ? (
          <ul className="btn-group mb-2 ">
            <Link className="btn " to="/chat">
              Chat
            </Link>

            {user && (
              <Link className="btn " to="/dashboard">
                {user.name}
              </Link>
            )}
            <Link onClick={() => logout()} className="btn " to="/login">
              Logout
            </Link>
            <Link className="btn " to="/about">
              About
            </Link>
          </ul>
        ) : (
          <ul className="btn-group mb-2">
            <Link className="btn " to="/login">
              Login
            </Link>
            <Link className="btn " to="/register">
              Signup
            </Link>
            <Link className="btn " to="/about">
              About
            </Link>
          </ul>
        )}
      </div>
      <Fragment>
        {user &&
          (user.emailVerified? null : alert && (
            <div className="verify alert alert-danger alert-dismissible mb-0 w-100 position-absolute" style={{zIndex:10}}>
                <button type="button" onClick={()=> setAlert(prev=>!prev)} className="close" data-dismiss="verify">&times;</button>
              Verify your email to keep enjoying all features.{" "}
              <Link className="alert-link" to="/verify">Click here</Link>
            </div>
          ))}
      </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
