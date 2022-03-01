import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userRequest } from "./requestMethod";


/**
 * Login for user.
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null, //No user at default.
    fetching: false,
    success: false,
    fail: false,
  },
  reducers: {
      login: (state)=>{
        state.fetching=true;
      },
      loginSuccess: (state, action)=>{
        state.fetching=false;
        state.success=true;
        state.currentUser= action.payload;
      },
      loginFail: (state)=>{
        state.fetching=false;
        state.fail=true;
      },
      logout: (state)=>{
        state.currentUser=null;
      }
  },
});

//Login function to be called in login page, takes in dispatch hook and un,up.
export const loginFunc = async (dispatch, navigate, userLoginCredential) => {
    dispatch(login());
    try{
        const res = await userRequest.post('/auth/login', userLoginCredential);
        // console.log("res data is: ", res.data)
        dispatch(loginSuccess(res.data));
        navigate('/')
    }catch(err){
        dispatch(loginFail());
        console.log("Something wrong with login")
    }  
}
export const logoutFunc = (dispatch, navigate) =>{
  dispatch(logout());
  navigate('/')
}

export const {login, logout, loginSuccess, loginFail} = userSlice.actions;
export default userSlice.reducer;
