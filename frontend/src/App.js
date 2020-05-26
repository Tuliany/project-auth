import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from "react-redux";

 import { user } from './reducers/user.js'
 import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { Home } from 'components/Home'
import { Signup } from 'components/Signup'
import { Login } from 'components/Login'
import { Secrets } from 'components/Secrets'

 
const reducer = combineReducers({ user: user.reducer })

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
  <BrowserRouter>
  <Switch>
  <Route path="/" exact>
    {/* <h1>Welcome</h1> */}
      <Home />
    </Route>
    <Route path="/signup" exact>
    <h1>SIGN UP</h1>
      <Signup />
    </Route>

    <Route path="/login" exact>
    <h1>LOG IN</h1>
    <Login />
    </Route>
    <Route path="/secrets" exact>
    <h1>Sshh</h1>
      <Secrets />
    </Route>
  </Switch>
  </BrowserRouter>
  </Provider>
  
  )
}
