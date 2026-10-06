import React from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("./setup")
  }

  return (
    <main className="dark:bg-slate-600">
      <div id="login-section" className="bg-gray-200">
        <h1 className="caveat-brush-font" id="intro">Join to Play Bingo</h1>
        <form className="bg-gray-300" method="get" onSubmit={handleSubmit}>
          <div className="input-section">
            <label htmlFor="identify">Email:</label>
            <input id="identify" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-section">
            <label htmlFor="id-pass">Password:</label>
            <input id="id-pass" type="password" placeholder="password" />
          </div>
          <button id="login" className="bg-red-400 dark:bg-amber-500 text-white" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}