import React from 'react';
import './setup.css';
import { useNavigate } from "react-router-dom";

export function Setup(properties) {
  const navigate = useNavigate();
  const [ID, setID] = React.useState("");
  const [seed, setSeed] = React.useState("");

  // I use these to track which buttons should be highlighted
  const [difficulty, setDifficulty] = React.useState(properties.settings.difficulty);
  const [focus, setFocusMode] = React.useState(properties.settings.focusMode);
  const [repeats, setRepeats] = React.useState(properties.settings.repeatsAllowed);
  const [loadout, setLoadout] = React.useState(properties.settings.loadout)

  function handleSubmit(event) {
    event.preventDefault();

    if (event.nativeEvent.submitter?.value === "join") {
      joinGame();
    } else {
      startGame();
    }
  }

  function generateRandomID() {
    let newID = ""
    for (let i = 0; i < 5; i++) {
      let newDigit = Math.floor(Math.random() * 10);
      newID += String(newDigit);
    }
    return newID;
  }

  function createID(id) {
    const newSeed = seed.trim() || id;

    properties.onGameSetup(id, newSeed);
    navigate("./../bingo");
  }

  function startGame() {
    createID(ID.trim() || generateRandomID());
  }

  function joinGame() {
    if (!ID.trim()) {
      return;
    }

    createID(ID.trim());
  }

  function changeDifficulty(diff) {
    // console.log(`Setting difficulty to ${diff}`)
    setDifficulty(diff)
    properties.setSettings(prev => ({...prev, difficulty: diff}))
  }

  function highlightDifficultyButton(diff) {
    if (difficulty == diff) {
      return "bg-red-400 hover:bg-red-500 dark:bg-amber-400 dark:hover:bg-amber-500";
    } else {
      return "bg-red-200 hover:bg-red-300 dark:bg-amber-200 dark:hover:bg-amber-300";
    }
  }

  function changeLoadout(load) {
    // console.log(`Setting loadout to ${load}`)
    setLoadout(load)
    properties.setSettings(prev => ({...prev, loadout: load}))
  }

  function highlightLoadoutButton(load) {
    if (loadout == load) {
      return "dark:bg-red-400 dark:hover:bg-red-500 bg-amber-400 hover:bg-amber-700";
    } else {
      return "dark:bg-red-200 dark:hover:bg-red-300 bg-amber-200 hover:bg-amber-300";
    }
  }

  function toggleFocusMode() {
    // console.log(`Focus mode is: ${(focus == true) ? false : true}`)
    setFocusMode((focus == true) ? false : true);
    properties.setSettings(prev => ({...prev, focusMode: (focus == true) ? false : true}))
  }

  function highlightFocusButton() {
    if (focus == true) {
      return "bg-blue-400 hover:bg-blue-500 dark:bg-green-400 dark:hover:bg-green-500";
    } else {
      return "bg-blue-200 hover:bg-blue-300 dark:bg-green-200 dark:hover:bg-green-300";
    }
  }

  function highlightRepeatButton() {
    if (repeats == true) {
      return "bg-blue-400 hover:bg-blue-500 dark:bg-green-400 dark:hover:bg-green-500";
    } else {
      return "bg-blue-200 hover:bg-blue-300 dark:bg-green-200 dark:hover:bg-green-300";
    }
  }

  function toggleRepeatMode() {
    // console.log(`Repeat mode is: ${(repeats == true) ? false : true}`)
    setRepeats((repeats == true) ? false : true);
    properties.setSettings(prev => ({...prev, repeatsAllowed: (repeats == true) ? false : true}))
  }

  return (
    <main id="setup-page" className="dark:bg-slate-600">
      <section id="setup-section" className="bg-gray-200">
        <h1 id="setup" className="caveat-brush-font">Settings</h1>
        <form method="get" onSubmit={handleSubmit}>
          <div id="difficulty" className="settings-section">
            <label>Difficulty:</label>
            <button 
                className = {highlightDifficultyButton("easy")}
                type="button"
                onClick = {() => changeDifficulty("easy")}>
              Easy
            </button>
            <button 
                className = {highlightDifficultyButton("medium")}
                type="button"
                onClick = {() => changeDifficulty("medium")}>
              Medium
            </button>
            <button 
                className = {highlightDifficultyButton("hard")}
                type="button"
                onClick = {() => changeDifficulty("hard")}>
              Hard
            </button>
          </div>
          <div id="bingo-loadout" className="settings-section">
            <label>Bingo Loadout:</label>
            <button 
                className = {highlightLoadoutButton("fast-and-testimony")}
                type="button"
                onClick = {() => changeLoadout("fast-and-testimony")}>
              Fast & Testimony Meeting
            </button>
            <button 
                className = {highlightLoadoutButton("general-conference")} 
                type="button"
                onClick = {() => changeLoadout("general-conference")}>
              General Conference
            </button>
          </div>
          <div id="modifiers" className="settings-section">
            <label>Modifiers:</label>
            <button 
                className = {highlightFocusButton()}
                type="button"
                onClick = {() => toggleFocusMode()}>
              Focus Mode
            </button>
            <button 
                className = {highlightRepeatButton()}
                type="button"
                onClick = {() => toggleRepeatMode()}>
              Repeats Allowed
            </button>
          </div>
          <div id="board-seed" className="settings-section">
            <label htmlFor="seed">Seed:</label>
            <input 
                id="seed"
                type="text"
                className="bg-white dark:bg-gray-700 dark:text-white"
                placeholder="Optional - uses Game ID"
                value = {seed}
                onChange = {(e) => setSeed(e.target.value)}
            />
          </div>
          <br />
          <div id="enter-game" className="settings-section">
            <button 
                className="dark:bg-blue-400 dark:hover:bg-blue-500 bg-green-400 hover:bg-green-500" 
                type="submit"
                value="start">
              Start Game
            </button>
            <button 
                className="dark:bg-blue-400 
                  dark:hover:bg-blue-500 
                  bg-green-400 
                  hover:bg-green-500 
                  dark:disabled:bg-blue-200
                  dark:disabled:text-white
                  disabled:bg-green-200" 
                type="submit"
                value="join"
                disabled = {!ID.trim()}>
              Join Game:
            </button>
            <input type="text" placeholder="Game ID" onChange = {(e) => setID(e.target.value)}/>
            <label id="warning">Use the same Game ID or seed and the same settings to generate matching boards. Live game connections are not implemented yet.</label>
          </div>
        </form>
      </section>
    </main>
  );
}