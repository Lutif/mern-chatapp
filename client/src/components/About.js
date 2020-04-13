import React, { useState } from 'react'
import {sendEmail} from "../actions/email"
import { connect } from 'react-redux'

function About({sendEmail,subs}) {
    const [email,setEmail]=useState("")

    const subscribe=()=>{
        sendEmail(email)

    }

    return (
        <div className="pt-5 ">
            <div className="bg-secondary mt-5 mx-auto col-md-6 card">
                <div>This app is developed by <span className="card-title">Lutif Ali</span> </div>                
                <div>Contact on Social media  </div>                
                <div>fa-facebook, fa-twitter, </div>
                <div>Subscribe for updates
                    <div><input name="email" onChange={e=>setEmail(e.target.value)} value={email} placeholder="your email" /> 
                    <button onClick ={subscribe}>Subscribe</button></div>
                    </div>                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
subs:state.subs    
})

const mapDispatchToProps = {
sendEmail    
}

export default connect(mapStateToProps,mapDispatchToProps)( About)
