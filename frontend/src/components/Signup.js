import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { user, log } from '../reducers/user'
import '../Style/Signup.css'

const SIGNUP_URL ='http://localhost:8080/signup'

export const Signup = () => {
  const history = useHistory ()
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const errorMessage = useSelector((store) => store.user.login.errorMessage)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')

  const handleSignup = event => {
    event.preventDefault()
    // history.push('/secrets')


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
      dispatch(
        user.actions.setAccessToken({
          accessToken: json.accessToken
        }))})
        .catch((err) => {
          dispatch(user.actions.setErrorMessage({errorMessage: err}))
        })
  
    // .then((res) => res.json())
    // .then((json) => console.log(json))
    // .catch((err) => console.log("error:", err));
  }
  useEffect (() => {
    if (accessToken) {
      // history.push('/secrets')
    }
  })
  
  return (
    <div>
    <form className="Signup">
    <div class="question">
    <label> SIGN UP!</label>
      <input type="text" placeholder="Name"required 
        value={name} onChange={event => setName(event.target.value)}/>
    
    </div>
    <div class="question">
   
      <input type="email" placeholder="Email"required 
        value={email} onChange={event => setEmail(event.target.value)}/>

    </div>
    <div class="question">
    
      <input type="password" placeholder="Password"required 
        value={password} onChange={event => setPassword(event.target.value)}/>
    </div>
    <button type="submit" onClick={handleSignup}>
      Submit
    </button>
    <button type ="Home" onClick={() => history.push('/')}> Home </button> 
  </form>
  <h2>{errorMessage && <p> {`${errorMessage}`}</p>}</h2>

  </div>
  )
}