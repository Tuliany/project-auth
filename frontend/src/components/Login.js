import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { user, login } from '../reducers/user'
import '../Style/Login.css'

export const Login = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const accessToken = useSelector((store) => store.user.login.acessToken)
   const errorMessage = useSelector((store) => store.user.login.errorMessage)

   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   
   const handleLogin = event => {
    event.preventDefault()
    dispatch(login(name, password))
    // history.push('/secrets')
  }  

  useEffect (() => {
  if (accessToken) {
    history.push('/secrets')
  } 
})

  useEffect(() => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  }, [dispatch])

 if (!accessToken) {
  return (
    <div>
      <form className="login">
        <label>LOG IN!</label>
          <div className="question">
              <input type="text" placeholder="Name"required 
              value={name} onChange={event => setName(event.target.value)}/>
          </div>
          <div className="question">
              <input type="password" placeholder="Password"required 
              value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
        <button type="submit" onClick={handleLogin}>
            Login
        </button>
        <button type ="Home" onClick={() => history.push('/')}> Home </button>  
      </form>
      <h3>{errorMessage && <p> {`${errorMessage} `}</p>}</h3>
    </div>
  )
} 
else {
  //
  return <null/>
}
}

export default Login
