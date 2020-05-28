import React from 'react'
import { user, logout, getSecretMessage } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../Style/Secrets.css'



export const Secrets = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const secretMessage = useSelector((store) => store.user.login.secretMessage)
  // const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const history = useHistory()
  return (
    <div className="secrets">
    {/* <button type ="Home" onClick={() => dispatch(logout())}> LOG OUT </button> */}

     <button type ="Home" onClick={(e) => dispatch(logout())}> LOG OUT </button>
     {/* {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>} */}
      {secretMessage && <h4>Secret Message : {`${secretMessage}`}</h4>}
      <h4>userId :</h4>
      <p> {`${userId}`}</p>
      <h4>accessToken :</h4>
      <p> {`${accessToken}`}</p>
    </div>
  )
}