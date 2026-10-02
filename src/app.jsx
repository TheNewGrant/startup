import React from 'react';
import './app.css';

// Router setup
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Bingo } from './bingo/bingo';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { Setup } from './setup/setup';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body">
            <header className="bg-gray-50 dark:bg-gray-800">
            <h1 className="caveat-brush-font text-5xl text-amber-500">Church Bingo!</h1>
            <nav>
            <ul>
                <li><NavLink href="index.html" className="text-red-400 hover:text-red-300 dark:text-white dark:hover:text-amber-400 font-extrabold">Home</NavLink></li>
                <li><NavLink href="html/setup.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">Setup</NavLink></li>
                <li><NavLink href="html/bingo.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">Play</NavLink></li>
                <li><NavLink href="html/scores.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">Scores</NavLink></li>
                <li><NavLink href="html/about.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">About</NavLink></li>
            </ul>
            </nav>

            <hr />
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='/setup' element={<Setup />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-gray-50 dark:bg-gray-800">
            <hr />
            <span className="text-reset dark:text-white">Mason Grant:</span>
            <a href="https://github.com/TheNewGrant/startup" className="text-red-300 dark:text-amber-400">GitHub</a>
        </footer>
    </div> 
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}