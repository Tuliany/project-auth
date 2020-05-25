import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    message: ""
  }
}
export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
        const { accessToken } = action.payload
        state.login.accessToken = accessToken
    },
    setUserId: (state, action ) => {
        const { userId } = action.payload
        state.login.userId = userId
    },
    setMessage: ( state, action ) => {
      const { message } = action.payload
      state.login.message = message
    },
    logout: ( state, action ) => {
      state.login.userId = 0
      state.login.accessToken = null
    }
  }
})