import React, {useState} from 'react'
import { Secrets } from './Secrets'
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../reducers/user'
import { useHistory } from 'react-router-dom';


const LOGIN_URL = "http://localhost:8080/login"



export const Login = () => {
  const history = useHistory()
   const dispatch = useDispatch()
   const accessToken = useSelector((store) => store.user.loginacessToken)
   const [name, setName] = useState("")
   const [ password, setPassword] = useState("")

   const handleLoginSuccess = (loginResponse) => {
     //DEBBUGING
     const statusMessage = JSON.stringify(loginResponse)
     dispatch(user.actions.setStatusMessage({ statusMessage }))
    // SAVE LOGIN
      dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken}))
      dispatch (user.actions.setUserId({ userId: loginResponse.userId}))
      history.push('/secrets')
  }

  const handleLoginFailed = (loginError) => {
    const statusMessage = JSON.stringify(loginError)
      dispatch(user.actions.setStatusMessage({ statusMessage }))

    //CLEAR LOGIN
      dispatch(user.actions.logout)
  }

   const handleLogin = (event) => {
     event.preventDefault()

   fetch(LOGIN_URL, {
     method: 'POST',
     body: JSON.stringify({ name, password }),
     headers: { 'Content-Type': 'application/json'}
   })

    .then((res) => res.json())
    .then((json) =>  handleLoginSuccess(json))
    .catch((err) =>  handleLoginFailed (err))
  }

 if (!accessToken) {
  return (
    <div>
      <form>
        <h2>LOGIN</h2>
          <label> Name:
            <input type="text" required 
            value={name} onChange={event => setName(event.target.value)}/>
          </label>

          <label> Password:
            <input type="password" required 
            value={password} onChange={event => setPassword(event.target.value)}/>
          </label>
          <button type="Login" onClick={handleLogin}>
            Login
          </button>
          <button type ="Home" onClick={() => history.push('/')}> Home </button>  

      </form>
    </div>
  
  )
} else {
  // If user is logged in, show profile
  return <Secrets />
}
}
