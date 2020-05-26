import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const SIGNUP_URL ='http://localhost:8080/signup'

export const Signup = () => {
  const history = useHistory ()
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = event => {
    event.preventDefault()
    history.push('/secrets')


    fetch(`${SIGNUP_URL}`,
    {
      method: 'POST',
      body: JSON.stringify({name, mail, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log("error:", err));

    // .then(res => res.json())
    // .then(() => {
    //    setName('')
    //    setMail('')
    //    setPassword('')
    // .catch(err => console.log("error:", err))
    //  })
  }
  
  return (
    <div>
    <form>
    <label> Name:
      <input type="text" required 
        value={name} onChange={event => setName(event.target.value)}/>
    </label>

    <label> Email:
      <input type="email" required 
        value={mail} onChange={event => setMail(event.target.value)}/>
    </label>

    <label> Password:
      <input type="password" required 
        value={password} onChange={event => setPassword(event.target.value)}/>
    </label>

    <button type="submit" onClick={handleSignup}>
      Submit
    </button>
    <button type ="Home" onClick={() => history.push('/')}> Home </button> 
  </form>
  </div>
  )
}