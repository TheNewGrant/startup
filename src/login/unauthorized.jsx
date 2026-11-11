import React from 'react'
import './login.css';

export function Unauthorized(properties) {
    const [userName, setUserName] = React.useState(properties.userName);
    const [password, setPassword] = React.useState("");

    function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }
    
    function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ email: userName, password: password }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            const body = await response.json();
            if (!response.ok) {
                alert(body.msg ?? 'Unable to log in or create an account.');
                return;
            }
            localStorage.setItem('userName', body.email);
            properties.onLogin(body.email);
        } catch (error) {
            console.error('Authentication request failed:', error);
            alert('Unable to complete the request. Check that the service is running.');
        }
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