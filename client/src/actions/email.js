import {EMAIL_SUBSCRIBE,LOAD_USER} from './types'
import axios from 'axios'


export const sendEmail=(email)=> async dispatch=>{

    try {
        const config ={
            headers:{
                "Content-Type":"Application/json"
            }
        }
        console.log("sending email request")
        const res= await axios.post("/api/users/subs",{email},config)
        console.log("email request send")
       dispatch({
           type:EMAIL_SUBSCRIBE
       })
    } catch (err) {
        console.error(err)
    }
}
export const sendVerification=(verificationToken,email)=>async dispatch=>{
    console.log("sendVerification called")
    try {
        const config ={
            headers:{
                "Content-Type":"Application/json"
            }
        }
        console.log("sending email request")
        const res= await axios.post("/api/users/subs",{email, verificationToken},config)
        console.log("email request send")
       dispatch({
           type:EMAIL_SUBSCRIBE
       })
    } catch (err) {
        console.error(err)
    }
}

//send verification success
export const verified=()=>async dispatch=>{
    try {
        const res= await axios.get("/api/users/subs")
        dispatch({
            type: LOAD_USER,
            payload: res.data,
          });
    } catch (err) {
        console.error(err)
    }
}
