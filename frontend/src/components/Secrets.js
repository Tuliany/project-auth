import React from 'react'
import { logout } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../Style/Secrets.css'

export const Secrets = () => {
  const dispatch = useDispatch()
  const userName = useSelector((store) => store.user.login.userName)
  const history = useHistory()

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return (
    <div className="secrets"> 
    <button type="submit" onClick={handleLogout}>Logout</button>
       <h4> {`Welcome ${userName}`}</h4>
    </div>
  )
}