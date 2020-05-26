import React from 'react'
import { useHistory } from 'react-router-dom';
import '../Style/Secrets.css'



export const Secrets = () => {
  const history = useHistory()
  return (
    <div className="secrets">
     <button type ="Home" onClick={() => history.push('/')}> Home </button>
     <h7>THANK YOU AWESOME TEAM 🦒</h7>
    </div>
  )
}