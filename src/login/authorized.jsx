import React from 'react'

import { useNavigate } from "react-router-dom";

export function Authorized(properties) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    properties.onLogout();
  }

  return (
      <div className = "bg-gray-300">
        <div className = "player-name">{properties.userName}</div>
        <button id = "login" 
            className = "bg-red-400 dark:bg-amber-500 text-white" 
            type = "submit" 
            onClick = {() => navigate('/play')}>
          Play
        </button>
        <button id = "create" 
            className = "bg-red-400 dark:bg-amber-500 text-white" 
            type = "submit"
            onClick = {() => logout()}>
          Logout
        </button>
      </div>
  );
}