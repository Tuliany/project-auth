import React from 'react'

import { useHistory } from 'react-router-dom';



export const Home = () => {
  const history = useHistory()

  return (
    <div>
      <form>
          <button type ="Login" onClick={() => history.push('/Login')}> Log in  </button>
          <button type ="Signup" onClick={() => history.push('/Signup')}> Create Accout </button>  
      </form>
    </div>
  )
}