import React from 'react';
import './bingo.css';
import { TileGenerator } from './tile-generator'
import { BingoTile } from './bingo-tile';
import { GameEvent, GameNotifier } from './game-notifier';

export function Bingo(properties) {
  const [bingoBoard, setBingoBoard] = React.useState(
    [[false, false, false, false, false], 
    [false, false, false, false, false], 
    [false, false, false, false, false], 
    [false, false, false, false, false], 
    [false, false, false, false, false]]
  );
  const [rowBingos, setRowBingos] = React.useState(0);
  const [colBingos, setColBingos] = React.useState(0);
  const [diaBingos, setDiaBingos] = React.useState(0);

  function detectBingo() {
    let numRowBingos = 0;
    let numColBingos = 0;
    let numDiagonalBingos = 0;
    let diagonalBingo1 = [];
    let diagonalBingo2 = [];

    for (let i = 0; i < 5; i++) {
      diagonalBingo1.push(bingoBoard[i][i]);
      diagonalBingo2.push(bingoBoard[i][4 - i]);

      const row = bingoBoard[i];
      const rowAllTrue = row.every(value => value === true);
      if (rowAllTrue) {
        numRowBingos++;
      }
      let col = []
      for (let j = 0; j < 5; j++) {
        col.push(bingoBoard[j][i]);
      }
      const colAllTrue = col.every(value => value === true);
      if (colAllTrue) {
        numColBingos++;
      }
    }
    if (diagonalBingo1.every(value => value === true)) {
      numDiagonalBingos++;
    }
    if (diagonalBingo2.every(value => value === true)) {
      numDiagonalBingos++;
    }


    const previousTotal = rowBingos + colBingos + diaBingos;
    const newTotal = numRowBingos + numColBingos + numDiagonalBingos;

    console.log("Totals:", previousTotal, newTotal);

    if (newTotal > previousTotal) {
      saveScore(newTotal)
    }

    setRowBingos(numRowBingos);
    setColBingos(numColBingos);
    setDiaBingos(numDiagonalBingos);
  }

  async function saveScore(score) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: properties.userName, score: score, date: date };

    // Let other players know the game has concluded
    GameNotifier.broadcastEvent(properties.userName, GameEvent.End, newScore);

    updateScoresLocal(newScore);
  }

  function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
  }


  return (
    <main className="dark:bg-slate-600">
    <section id="realtime-updates" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      <p id="game-id"><b>Game ID:</b> 12345</p>
      <div className="players">
        <b>Player: </b>
        <span className="player-name">Mason</span>
      </div>
      <br/>
      <hr/>
      <br/>
      <ul className="notification">
        <li className="player-name">Jeff joined the bingo game</li>
        <li className="player-name">George scored a bingo</li>
        <li className="player-name">Anna completed a category</li>
      </ul>
      <br/>
      <hr/>
      <br/>
      <div>
        <label htmlFor="count">Score</label>
        <input className="bg-white dark:bg-gray-700" type="text" id="count" value="--" readOnly />
      </div>

    </section>
    <section id="board-section" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      {/*Bingo Table: The images in each square come from the API I intend to use (Iconify)*/}
      <table id="bingo-board" className="bg-white dark:bg-gray-600">
        <caption>Bingo Board</caption>
        <tr>
          <BingoTile settings = {properties.settings} corner = {"upper-left"} row = {0} col={0} onBoardChange={(newBoard) => {setBingoBoard(newBoard), detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {0} col={1} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {0} col={2} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {0} col={3} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} corner = {"upper-right"} row = {0} col={4} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} row = {1} col={0} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {1} col={1} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {1} col={2} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {1} col={3} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {1} col={4} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} row = {2} col={0} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {2} col={1} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {2} col={2} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {2} col={3} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {2} col={4} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} row = {3} col={0} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {3} col={1} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {3} col={2} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {3} col={3} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {3} col={4} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} corner = {"lower-left"} row = {4} col={0} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {4} col={1} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {4} col={2} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} row = {4} col={3} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
          <BingoTile settings = {properties.settings} corner = {"lower-right"} row = {4} col={4} onBoardChange={(newBoard) => {setBingoBoard(newBoard); detectBingo()}} board={bingoBoard}>

          </BingoTile>
        </tr>
      </table>
    </section>
  </main>
  );
}