import axios from "axios";
import {
  LOG_OUT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOAD_USER,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./types";
import setAuth from "../utils/setAuth";

//load user data in store
export const loadUser = () => async (dispatch) => {
    setAuth(localStorage.token);

  console.log("local storage is ",localStorage)
  try {
    const res = await axios.get("/api/users/me");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });

    //@todo add alert component to show errors
    console.error(error);
  }
};

//login user
export const login = (email, password) => async dispatch => {
  try {
    const user = JSON.stringify({ email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/auth", user, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, //token
    });
    localStorage.setItem("token",res.data.token)
    dispatch(loadUser());

  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register user
export const register = (name,email,password) => async (dispatch) => {
  try {
    const user = JSON.stringify({ name,email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users", user, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //token
    });
    localStorage.setItem("token",res.data.token)
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};


//Logout user 

export const logout=()=>dispatch=>{
dispatch({
  type:LOG_OUT
})

}