import React, { useState, Fragment, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login,loadUser } from "../actions/auth";

console.log(localStorage)
function Login({ login,loadUser,auth:{isAuthenticated,user} }) {
  
  useEffect(()=>{
    loadUser()
  },[])
    const [formdata, setFormdata] = useState({ email: "", password: "" });

  const handleOnchage = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  async function onLogin (e){
      e.preventDefault();
    await login(formdata.email, formdata.password);
    console.log("user is authencticated", isAuthenticated)
   
      return <Redirect to="/chat" />
  }    

  

  return (
    <Fragment> {isAuthenticated? <Redirect to="/chat"/>: 
    <div className="bg-dark container-fluid row" style={{ minHeight: "100vh" }}>
      <div className="text-white col-md-4 mx-auto my-auto pt-5 login-card">
        
        <h3 className="mx-auto ">Welcome to safe Chat</h3>
        <form onSubmit={onLogin} className="d-flex flex-column p-3 card bg-secondary">
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
            type="submit"
              className="btn btn-primary col-md-6 mt-2 py-1 px-1"
            

             value={"Login"}
            />
        </form>
                </div>
    </div>
  }  </Fragment>);
}

const mapDispatchToProps = {
  login,
  loadUser
};
const mapStateToProps = (state) => ({
auth: state.auth    
})



export default connect(mapStateToProps, mapDispatchToProps)(Login);
