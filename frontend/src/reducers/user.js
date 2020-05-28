import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    message: "",
    secretMessage: null,
    errorMessage: null,
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
    setUserId: (state, action ) => {
        const { userId } = action.payload
        console.log(`User Id: ${userId}`)
        state.login.userId = userId
    },
      setSecretMessage: ( state, action ) => {
      const { secretMessage } = action.payload
      console.log(`Secret Message: ${secretMessage}`)
      state.login.secretMessage = secretMessage
    },
    // setStatusMessage: ( state, action ) => {
    //   const { statusMessage } = action.payload
    //   console.log(`Status Message: ${statusMessage}`)
    //   state.login.statusMessage = statusMessage
    // },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      console.log(`Error Message: ${errorMessage}`)
      state.login.errorMessage = errorMessage;
    },
    // logout: ( state, action ) => {
    //   console.log("Logging out")
    //   state.login.userId = 0
    //   state.login.accessToken = null
    // }
  }
})

// THUNK 
export const log = (name, password) => {
  const LOG_URL ='http://localhost:8080/login'
  return (dispatch) => {
    fetch(LOG_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json'}
    })
 
     .then((res) => {
       if (res.ok){
         return res.json()
       }
       throw 'Unable to sign in. Please check you username and password'
     })
     .then((json)=> {
       dispatch(
         user.actions.setAccessToken({
           accessToken: json.accessToken
         })
       )
       dispatch(user.actions.setUserId({ userId: json.userId}))
     })
     .catch((err) => {
      //  dispatch(user.actions.logout())
       dispatch(user.actions.setErrorMessage({ errorMessage: err }))
     })
  }
}

export const getSecretMessage = () => {
  const SECRET_URL = 'http://localhost:8080/secrets'
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    const userId= getState().user.login.userId
    fetch (`${SECRET_URL}/${userId}/secret`,{
      method:'GET',
      headers: { Authorization: accessToken}
    })
    .then((res)=> {
      if (res.ok) {
        return res.json()
      }
      throw ' Could not get info. Try again'
    })
    .then((json) => {
      dispatch(
        user.actions.setSecretMessage({ secretMessage: JSON.stringify(json)})
      )
    })
    .catch((err) =>{
      dispatch(user.actions.setErrorMessage({ errorMessage: err }))
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setSecretMessage({ secretMessage: null }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserId({ userId: 0 }))
  }
}