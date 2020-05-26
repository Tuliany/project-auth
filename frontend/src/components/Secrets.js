import React from 'react'
import { useHistory } from 'react-router-dom';


export const Secrets = () => {
  const history = useHistory()
  return (
    <div>
     <button type ="Home" onClick={() => history.push('/')}> Home </button>
    </div>
  )
}