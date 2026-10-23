import React from 'react';
import './app.css';

// Router setup
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Bingo } from './bingo/bingo';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { Setup } from './setup/setup';
import { AuthState } from './login/auth-state';

const defaultSettings = {
    difficulty: 'easy',
    loadout: 'fast-and-testimony',
    focusMode: false,
    repeatsAllowed: false,
};

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem("userName") || "");
    const currentAuthState = userName ? AuthState.Authorized : AuthState.Unauthorized;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [gameID, setGameID] = React.useState(localStorage.getItem("gameID") || '00000');

    const focusedText = "text-red-400 hover:text-red-300 dark:text-white dark:hover:text-amber-400 font-extrabold";
    const unfocusedText = "text-gray-500 hover:text-red-300 dark:hover:text-white";

    const [settings, setSettings] = React.useState(() => {
        try {
            const settingsText = localStorage.getItem("settings");
            return settingsText ? {...defaultSettings, ...JSON.parse(settingsText)} : {...defaultSettings};
        }
        catch (err) {
            return {...defaultSettings};
        }
    });

    const [seed, setSeed] = React.useState(() => localStorage.getItem("seed") || gameID);
    const [gameSession, setGameSession] = React.useState(() => localStorage.getItem("gameSession") || crypto.randomUUID());

    React.useEffect(() => {
        if (authState === AuthState.Authorized) {
            localStorage.setItem("settings", JSON.stringify(settings));
            localStorage.setItem("seed", seed);
            localStorage.setItem("gameSession", gameSession);
            localStorage.setItem("gameID", gameID);
        }
    }, [settings, seed, gameSession, gameID, authState]);

    function handleGameSetup(gameID, seed) {
        localStorage.removeItem("bingoProgress");

        setGameID(gameID);
        setSeed(seed);
        setGameSession(crypto.randomUUID());
    }

    return (
    <BrowserRouter>
        <div className="body">
            <header className="bg-gray-50 dark:bg-gray-800">
            <h1 className="caveat-brush-font text-5xl text-amber-500">Church Bingo!</h1>
            <nav>
            <ul>
                <li><NavLink className={({isActive}) => isActive ? focusedText : unfocusedText} to="">Home</NavLink></li>
                { authState === AuthState.Authorized &&
                    <li><NavLink className={({isActive}) => isActive ? focusedText : unfocusedText} to="setup">Setup</NavLink></li>
                }
                { authState === AuthState.Authorized &&
                    <li><NavLink className={({isActive}) => isActive ? focusedText : unfocusedText} to="bingo">Play</NavLink></li>
                }
                { authState === AuthState.Authorized &&
                    <li><NavLink className={({isActive}) => isActive ? focusedText : unfocusedText} to="scores">Scores</NavLink></li>
                }
                <li><NavLink className={({isActive}) => isActive ? focusedText : unfocusedText} to="about">About</NavLink></li>
            </ul>
            </nav>

            <hr />
        </header>

        <Routes>
            <Route path='/' element=
                {
                    <Login 
                    userName = {userName}
                    authState = {authState}
                    onAuthChange = {(userName, authState) => {
                        setUserName(userName);
                        setAuthState(authState);

                        if (authState === AuthState.Unauthorized) {
                            localStorage.removeItem("settings");
                            localStorage.removeItem("seed");
                            localStorage.removeItem("gameSession");
                            localStorage.removeItem("gameID");
                            localStorage.removeItem("bingoProgress");

                            setUserName("");
                            setSettings({...defaultSettings});
                            setSeed("");
                            setGameSession("");
                            setGameID("00000");
                        }
                    }}
                    />
                } exact 
            />
            <Route path='/bingo' element=
                {
                    <Bingo 
                        userName = {userName} 
                        gameID = {gameID}
                        settings = {settings}
                        seed = {seed}
                        gameSession = {gameSession}
                    />
                } 
            />
            <Route path='/scores' element=
                {
                    <Scores 
                    
                    />
                }
            />
            <Route path='/about' element={<About />} />
            <Route path='/setup' element=
                {
                    <Setup 
                        gameID = {gameID} 
                        settings = {settings}
                        setSettings = {setSettings}
                        onGameSetup = {handleGameSetup}
                    />
                } />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-gray-50 dark:bg-gray-800">
            <hr />
            <span className="text-reset dark:text-white">Mason Grant: </span>
            <a href="https://github.com/TheNewGrant/startup" className="text-red-300 dark:text-amber-400">GitHub</a>
        </footer>
    </div> 
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}