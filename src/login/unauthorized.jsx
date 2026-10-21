import React from 'react'
import './login.css';

export function Unauthorized(properties) {
    const [userName, setUserName] = React.useState(properties.userName);
    const [password, setPassword] = React.useState("");

    async function loginUser() {
        localStorage.setItem('userName', userName);
        properties.onLogin(userName);
    }
    
    async function createUser() {
        localStorage.setItem('userName', userName);
        properties.onLogin(userName);
    }

    return (
        <div className = "form">
            <div className="input-section">
                <label htmlFor="identify">Email:</label>
                <input id="identify" 
                type="text" 
                placeholder="your@email.com" 
                value = {userName}
                onChange = {(e) => setUserName(e.target.value)} />
            </div>
            <div className="input-section">
                <label htmlFor="id-pass">Password:</label>
                <input id="id-pass" 
                type="password" 
                placeholder="password" 
                value = {password}
                onChange = {(e) => setPassword(e.target.value)} />
            </div>
            <button id="login" 
                    className="bg-red-400 dark:bg-amber-500 text-white dark:disabled:bg-amber-800 disabled:bg-red-200" 
                    type="submit"
                    disabled = {!userName || !password}
                    onClick = {() => loginUser()}>
                Login
            </button>
            <button id="create" 
                    className="bg-red-400 dark:bg-amber-500 text-white dark:disabled:bg-amber-800 disabled:bg-red-200" 
                    type="submit"
                    disabled = {!userName || !password}
                    onClick = {() => createUser()}>
                Create
            </button>
        </div>
    )
}