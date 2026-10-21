import React from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import { AuthState } from './auth-state';
import { Authorized } from './authorized';
import { Unauthorized } from './unauthorized';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("./setup")
  }

  return (
    <main className="dark:bg-slate-600">
      <div id="login-section" className="bg-gray-200">
        <h1 className="caveat-brush-font" id="intro">Join to Play Bingo</h1>
        {authState === AuthState.Authorized && <Authorized 
          userName = {userName}
          onLogout = {() => onAuthChange(userName, AuthState.Unauthorized)}
        ></Authorized>}
        {authState === AuthState.Unauthorized && <Unauthorized 
          userName = {userName}
          onLogin = {(loginUserName) => onAuthChange(loginUserName, AuthState.Authorized)}
        ></Unauthorized>}
      </div>
    </main>
  );
}