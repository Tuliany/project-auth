import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { user,signup } from '../reducers/user'
import '../Style/Signup.css'

export const Signup = () => {
  const history = useHistory ()
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const signupError = useSelector((store) => store.user.login.signupErrorMessage)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')

  const handleSignup = event => {
    event.preventDefault()
    dispatch(signup(name, email, password))
    // history.push('/secrets')
  }
 
  useEffect (() => {
    if (accessToken) {
      history.push('/secrets')
    }
  })

  useEffect(() => {
    dispatch(user.actions.setSignupErrorMessage({ signupError: null }))
  }, [dispatch])
  
  return (
    <div>
      <form className="Signup">
        <label> SIGN UP!</label>
          <div className="question">
            <input type="text" placeholder="Name"required 
            value={name} onChange={event => setName(event.target.value)}/>
          </div>
          <div className="question">
            <input type="email" placeholder="Email"required 
            value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div className="question">
            <input type="password" placeholder="Password"required 
            value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
      <button type="submit" onClick={handleSignup}>
        Submit
      </button>
      <button type ="Home" onClick={() => history.push('/')}> Home </button> 
    </form>
    <h3>{signupError && <p> {`${signupError}`}</p>}</h3>
  </div>
  )
}