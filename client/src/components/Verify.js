import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import {sendVerification,verified} from "../actions/email";

import Loader from "./Loader";
import { Redirect } from "react-router-dom";

const Verify = (props) => {
 const [emailSent,setEmailSent]=useState(false)
 const [verificationCode,setverificationCode]=useState("")


const compare=()=>{
    if ( verificationCode.trim()==props.auth.user.verificationToken)
    {
        console.log("code was correct calling verification")
        props.verified()
        return (<Redirect to="/chat" />)
    }
    else{
        console.log("incorrect code")
        
    }

}
 
const sendString=()=>{
    console.log("in sendSrting")
props.sendVerification(props.auth.user.verificationToken,props.auth.user.email)
setEmailSent(true)
}

    return (
    <Fragment>
      {emailSent?
      <div className="text-white  row full">
          <div className="my-auto mx-auto text-white">
          <div>
              Check your email we sent you code, past it here
          </div>
          <input placeholder="verification code" onChange={(e)=>setverificationCode(e.target.value)}  name="verificationCode" value={verificationCode} />
          <button onClick={compare } >Submit</button>
      </div>
      </div>
      : (
        <div className="text-white  row full">
          <button className="my-auto mx-auto btn text-white" onClick={sendString} >Click here to verifiy </button>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
    sendVerification,
    verified
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
