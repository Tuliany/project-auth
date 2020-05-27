import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../Style/Signup.css'

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
    <form className="Signup">
    <div class="question">
    <label> SIGN UP!</label>
      <input type="text" placeholder="Name"required 
        value={name} onChange={event => setName(event.target.value)}/>
    
    </div>
    <div class="question">
   
      <input type="email" placeholder="Email"required 
        value={mail} onChange={event => setMail(event.target.value)}/>

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
  </div>
  )
}