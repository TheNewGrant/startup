import React from 'react';
import './setup.css';
import { useNavigate } from "react-router-dom";

export function Setup(properties) {
  const navigate = useNavigate();
  const [ID, setID] = React.useState("");

  // I use these to track which buttons should be highlighted
  const [difficulty, setDifficulty] = React.useState("easy");
  const [focus, setFocusMode] = React.useState(false);
  const [repeats, setRepeats] = React.useState(false);
  const [loadout, setLoadout] = React.useState("fast-and-testimony")

  function handleSubmit(event) {
    event.preventDefault();
    navigate("./../bingo")
  }

  function generateRandomID() {
    let newID = ""
    for (let i = 0; i < 5; i++) {
      let newDigit = Math.floor(Math.random() * 10);
      newID += String(newDigit);
    }
    console.log("Generating ID")
    console.log(newID);
    createID(newID);
  }

  async function createID(id) {
    localStorage.setItem("gameID", id);
    properties.onGameIDChange(id);
  }

  async function startGame() {
    if (!ID) {
      generateRandomID()
    } else {
      createID(ID)
    }
    console.log(ID);
  }

  async function joinGame() {
    localStorage.getItem("gameID"); // We can't connect to the game yet, but this is the placeholder
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
    <main className="dark:bg-slate-600">
      <section className="bg-gray-200">
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
          <br />
          <div id="enter-game" className="settings-section">
            <button 
                className="dark:bg-blue-400 dark:hover:bg-blue-500 bg-green-400 hover:bg-green-500" 
                type="submit"
                onClick={() => startGame()}>
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
                disabled = {!ID}
                onClick = {() => joinGame()}>
              Join Game:
            </button>
            <input type="text" placeholder="Game ID" onChange = {(e) => setID(e.target.value)}/>
            <label id="warning">Note: If the inputted ID is non-existent, a new game with that ID will be hosted.</label>
          </div>
        </form>
      </section>
    </main>
  );
}