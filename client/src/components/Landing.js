import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link,Redirect } from 'react-router-dom'
import Loader from './Loader'

export const Landing = () => {
  return (

        <div className=" container-fluid row " style={{ minHeight: "100vh" }}>
          <div className="p-3 shadow text-white my-auto mx-auto card bg-dark ">
            
            <h2 className="mx-auto">Welcome to safe Chat</h2>
          <div className="btn-group mt-3 d-flex justify-content-center p-2">
            <Link className="col-md-6"   to="./login"><button className="btn btn-outline-primary  w-100">Login</button></Link>
            <Link className="col-md-6" to="/register"><button className="btn btn-outline-primary  w-100" >Register</button></Link>
        </div>
        </div>
        
        </div>
      
  )}

Landing.propTypes = {
  auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
