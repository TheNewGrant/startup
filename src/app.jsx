import React from 'react';
import './app.css';

export default function App() {
  return (
    <div className="body">
        <header className="bg-gray-50 dark:bg-gray-800">
        <h1 className="caveat-brush-font text-5xl text-amber-500">Church Bingo!</h1>
        <nav>
        <ul>
            <li><a href="index.html" className="text-red-400 hover:text-red-300 dark:text-white dark:hover:text-amber-400 font-extrabold">Home</a></li>
            <li><a href="html/setup.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">Setup</a></li>
            <li><a href="html/bingo.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">Play</a></li>
            <li><a href="html/scores.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">Scores</a></li>
            <li><a href="html/about.html" className="text-gray-500 hover:text-red-300 dark:hover:text-white">About</a></li>
        </ul>
        </nav>

        <hr />
    </header>

    <main>Page info will go here</main>

    <footer className="bg-gray-50 dark:bg-gray-800">
        <hr />
        <span className="text-reset dark:text-white">Mason Grant:</span>
        <a href="https://github.com/TheNewGrant/startup" className="text-red-300 dark:text-amber-400">GitHub</a>
    </footer>
  </div> 
  );
}