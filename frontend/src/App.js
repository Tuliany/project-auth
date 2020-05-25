import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from 'components/Signup'

export const App = () => {
  return (
   <BrowserRouter>
   <Switch>
     <Route path="/users" exact>
       <Signup />
     </Route>
     <Route path="/sessions" exact>
       <Profile />
     </Route>
   </Switch>
   </BrowserRouter>
  )
}
