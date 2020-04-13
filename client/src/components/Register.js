import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { register} from "../actions/auth";

function Register({ register,auth:{user, isAuthenticated}}) {
    
const [formdata, setFormdata]= useState({name:"",email:"",password:"",password2:""})

const handleOnchage = (e) => {
const { name, value } = e.target;
setFormdata((prev) => ({ ...prev, [name]: value }));
};

async function onRegister(e){
  e.preventDefault();  
  console.log(formdata)
  register(formdata.name, formdata.email ,formdata.password)
}
    return (
    <Fragment>{isAuthenticated? <Redirect to="./chat"/>:
        <div className="bg-dark container-fluid row " style={{ minHeight: "100vh" }}>
        <div className="text-white col-lg-4 mx-auto my-auto pt-5 login-card">
          <h3>Welcome to safe Chat</h3>
          <p className="small text-secondary ">Sign Up to start chatting!</p>
          <form onSubmit={onRegister} className="d-flex flex-column col-lg-10 my-5 py-2 card bg-secondary">
            <input
              type="text"
              className="my-1 input rounded py-1 px-1"
              onChange={handleOnchage}
              name="name"
              value={formdata.name}
              placeholder="name"
            />
            <input
              type="email"
              className="my-1  rounded py-1 px-1"
              onChange={handleOnchage}
              name="email"
              value={formdata.email}
              placeholder="Email"
            />
            <input
              type="password"
              className="my-1  rounded py-1 px-1"
              onChange={handleOnchage}
              name="password"
              value={formdata.password}
              placeholder="Password"
            />
            <input
              type="password"
              className="my-1  rounded py-1 px-1"
              onChange={handleOnchage}
              name="password2"
              value={formdata.password2}
              placeholder="Confirm Password"
            />
              <input
              type="submit"
                className="btn btn-primary col-lg-6 mt-2 py-1 px-1"
              
  
               value={"Sign UP"}
              />
          </form>
        </div>
      </div>
       }</Fragment>)
}

const mapStateToProps = (state) => ({
    auth:state.auth
})

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps,mapDispatchToProps) (Register)
