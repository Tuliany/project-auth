import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from 'components/Signup'
import { Profile } from 'components/Profile'
import { Secrets } from 'components/Secrets'

export const App = () => {
  return (
  <BrowserRouter>
  <Switch>
    <Route path="/signup" exact>
      <Signup />
    {/* </Route>
    <Route path="/sessions" exact>
    <Profile />
    </Route>
    <Route path="/secrets" exact>
      <Secrets /> */}
    </Route>
  </Switch>
  </BrowserRouter>
  
  )
}
