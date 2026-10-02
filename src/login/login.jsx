import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="dark:bg-slate-600">
      <div id="login-section" className="bg-gray-200">
        <h1 className="caveat-brush-font" id="intro">Join to Play Bingo</h1>
        <form className="bg-gray-300" method="get" action="html/setup.html">
          <div className="input-section">
            <label for="identify">Email:</label>
            <input id="identify" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-section">
            <label for="id-pass">Password:</label>
            <input id="id-pass" type="password" placeholder="password" />
          </div>
          <button id="login" className="bg-red-400 dark:bg-amber-500 text-white" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}