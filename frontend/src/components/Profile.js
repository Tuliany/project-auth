import React, { useState, useEffect } from 'react'
import { user } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'


const URL = 'http://localhost:8080/users'
export const Profile = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const message = useSelector((store) => store.user.login.message)

  const loginSuccess = (loginResponse) => {
    const message = `Authenticated Endpoint: ${JSON.stringify(
      loginResponse
    )}`
    dispatch(user.actions.setStatusMessage({message}))
  }

  const loginFailed = (loginError) => {
    const message = `Authenticated Endpoint Failed : ${JSON.stringify(
      loginError
    )}`
    dispatch(user.actions.setStatusMessage({message}))
  }

  const logout = () => {
    dispatch(user.actions.logout())
  }

  const login = () => {
    fetch(`${URL}/${userId}`, {
      method: 'GET',
      headers: { Authorizarion: accessToken},
    })
    .then((res) => res.json())
    .then((json) => loginSuccess(json))
    .catch((err) => loginFailer(err))
  }
  return (
    <div>
      <h5>Response</h5>
      <p>{`${message}`}</p>
      <h5>User:</h5>
      <p>{`${userID}`}</p>
      <h5>Password</h5>
      <p>{`${accessToken}`}</p>
      <input type="submit" onClick= {login} value="Login" />
      <input type="submit" onClick= {logout} value="Logout" />
    </div>
  )
}
export default Profile