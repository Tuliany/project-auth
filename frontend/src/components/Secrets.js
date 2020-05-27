import React from 'react'
import { useHistory } from 'react-router-dom';
import '../Style/Secrets.css'



export const Secrets = () => {
  const history = useHistory()
  return (
    <div className="secrets">
     <button type ="Home" onClick={() => history.push('/')}> LOG OUT </button>
     <h7>You Are Magic 🦒</h7>
    </div>
  )
}