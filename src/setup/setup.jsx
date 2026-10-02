import React from 'react';
import './setup.css';

export function Setup() {
  return (
    <main className="dark:bg-slate-600">
      <section className="bg-gray-200">
        <h1 id="setup" className="caveat-brush-font">Settings</h1>
        <form method="get" action="bingo.html">
          <div id="difficulty" className="settings-section">
            <label>Difficulty:</label>
            <button className="bg-red-400 hover:bg-red-500 dark:bg-amber-400 dark:hover:bg-amber-500" type="button">Easy</button>
            <button className="bg-red-400 hover:bg-red-500 dark:bg-amber-400 dark:hover:bg-amber-500" type="button">Medium</button>
            <button className="bg-red-400 hover:bg-red-500 dark:bg-amber-400 dark:hover:bg-amber-500" type="button">Hard</button>
          </div>
          <div id="bingo-loadout" className="settings-section">
            <label>Bingo Loadout:</label>
            <button className="dark:bg-red-400 dark:hover:bg-red-500 bg-amber-400 hover:bg-amber-500" type="button">Fast & Testimony Meeting</button>
            <button className="dark:bg-red-400 dark:hover:bg-red-500 bg-amber-400 hover:bg-amber-500" type="button">General Conference</button>
            <div>
              <button className="dark:bg-red-400 dark:hover:bg-red-500 bg-amber-400 hover:bg-amber-500" type="button">Custom:</button>
              <input type="text" placeholder="Custom Loadout Link:" />
            </div>
          </div>
          <div id="modifiers" className="settings-section">
            <label>Modifiers:</label>
            <button className="bg-blue-400 hover:bg-blue-500 dark:bg-green-400 dark:hover:bg-green-500" type="button">Focus Mode</button>
            <button className="bg-blue-400 hover:bg-blue-500 dark:bg-green-400 dark:hover:bg-green-500" type="button">Repeats Allowed</button>
          </div>
          <br />
          <div id="enter-game" className="settings-section">
            <button className="dark:bg-blue-400 dark:hover:bg-blue-500 bg-green-400 hover:bg-green-500" type="submit">Start Game</button>
            <button className="dark:bg-blue-400 dark:hover:bg-blue-500 bg-green-400 hover:bg-green-500" type="submit">Join Game:</button>
            <input type="text" placeholder="Game ID" />
            <label id="warning">Note: If the inputted ID is non-existent, a new game with that ID will be hosted.</label>
          </div>
        </form>
      </section>
    </main>
  );
}