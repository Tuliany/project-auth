import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  login: {
    accessToken: null,
    message: "",
    errorMessage: null,
    signupErrorMessage: null,
    userName: null
  }
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
        const { accessToken } = action.payload
        console.log(`Access Token: ${accessToken}`)
        state.login.accessToken = accessToken
    },
      setUserName: (state, action) => {
      const { userName } = action.payload
      console.log(`User name: ${userName}`)
      state.login.userName = userName
    },
      setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      console.log(`Error Message: ${errorMessage}`)
      state.login.errorMessage = errorMessage;
    },
      setSignupErrorMessage: (state, action) => {
      const { signupErrorMessage } = action.payload
      console.log(`Error Message: ${signupErrorMessage}`)
      state.login.signupErrorMessage = signupErrorMessage
    },
  }
})

// THUNK 
export const login = (name, password) => {
  const LOGIN_URL ='http://localhost:8080/login'
  return (dispatch, getState) => {
    fetch(`${LOGIN_URL}`, 
    {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json'}
    })
    .then((res) => {
      if (!res.ok){
      throw 'Unable to sign in. Please check you username and password' 
       }
       return res.json()
    })
     .then((json)=> {
       dispatch(user.actions.setAccessToken({accessToken: json.accessToken}))
       dispatch(user.actions.setUserName({ userName: name }))
      })
     .catch((err) => {
       dispatch(user.actions.setErrorMessage({ errorMessage: err }))
       dispatch(logout())
     })
  }
}

export const signup = (name, email, password) =>{
  const SIGNUP_URL ='http://localhost:8080/signup'
  return (dispatch, getState) =>{
    fetch(`${SIGNUP_URL}`,
    {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => {
      if (!res.ok) {
        throw 'Congratz! You are already a member 🚨'
      }
      return res.json()
    })
    .then((json) => {
      dispatch(user.actions.setAccessToken({accessToken: json.accessToken}))
      dispatch(user.actions.setUserName({ userName: name }))
      })
        .catch((err) => {
          dispatch(user.actions.setSignupErrorMessage({signupErrorMessage: err}))
        })
  }
}


export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setAccessToken({ accessToken: null, userName: null }))
    dispatch(user.actions.setUserName({ userName: null }))
  }
}