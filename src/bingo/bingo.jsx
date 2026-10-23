import React from 'react';
import './bingo.css';
import { TileGenerator } from './tile-generator'
import { BingoTile } from './bingo-tile';
import { GameEvent, GameNotifier } from './game-notifier';
import { Players } from './players';

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
  const [percentFilled, setPercentFilled] = React.useState(0);

  const {loadout, difficulty, repeatsAllowed = false} = properties.settings;
  const [tiles, setTiles] = React.useState([]);
  const [tileError, setTileError] = React.useState("");

  React.useEffect( () => {
    let cancelled = false;
    setTiles([]);
    setTileError("");
    setBingoBoard(Array.from({length: 5}, () => Array(5).fill(false)));
    setRowBingos(0);
    setColBingos(0);
    setDiaBingos(0);
    setPercentFilled(0);

    async function loadGenerator() {
      try {
        const tileGenerator = new TileGenerator(loadout);
        await tileGenerator.ready;
        if (cancelled) {
          return;
        }

        const generatedTiles = [];
        for (let i = 0; i < 25; i++) {
          generatedTiles.push(tileGenerator.generateRandomTile(difficulty, repeatsAllowed));
        }
        setTiles(generatedTiles);
      }
      catch (err) {
        if (!cancelled) {
          console.error("Could not load the bingo board", err);
          setTileError(err.message);
        }
      }
    }
    loadGenerator();

    return () => cancelled = true;
  }, [loadout, difficulty, repeatsAllowed, properties.gameID]);

  function countFilled(newBoard) {
    let fill = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (newBoard[i][j] === true) {
          fill++
        }
      }
    }
    setPercentFilled(fill * 4);
    return fill * 4;
  }

  function detectBingo(newBoard, newPercentFilled) {
    let numRowBingos = 0;
    let numColBingos = 0;
    let numDiagonalBingos = 0;
    let diagonalBingo1 = [];
    let diagonalBingo2 = [];

    for (let i = 0; i < 5; i++) {
      diagonalBingo1.push(newBoard[i][i]);
      diagonalBingo2.push(newBoard[i][4 - i]);

      const row = newBoard[i];
      const rowAllTrue = row.every(value => value === true);
      if (rowAllTrue) {
        numRowBingos++;
      }
      let col = []
      for (let j = 0; j < 5; j++) {
        col.push(newBoard[j][i]);
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
      saveScore(newTotal, newPercentFilled)
    }

    setRowBingos(numRowBingos);
    setColBingos(numColBingos);
    setDiaBingos(numDiagonalBingos);
  }

  async function saveScore(score, newPercentFilled) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: properties.userName, score: score, fill: newPercentFilled, date: date };

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

  function handleBoardChange(updateBoard) {
    const newBoard = updateBoard(bingoBoard);

    setBingoBoard(newBoard);

    const newPercentFilled = countFilled(newBoard);
    detectBingo(newBoard, newPercentFilled);
  }

  return (
    <main className="dark:bg-slate-600">
    <section id="realtime-updates" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      <p id="game-id"><b>Game ID:</b> {properties.gameID}</p>
      <div className="players">
        <b>Player: </b>
        <span className="player-name">{properties.userName}</span>
      </div>
      <br/>
      <hr/>
      <br/>
      <Players>

      </Players>
      <br/>
      <hr/>
      <br/>
      <div>
        <label htmlFor="count">Score</label>
        <input className="bg-white dark:bg-gray-700" type="text" id="count" value={(rowBingos + colBingos + diaBingos === 0) ? "--" : (rowBingos + colBingos + diaBingos)} readOnly />
      </div>

    </section>
    <section id="board-section" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      {/*Bingo Table: The images in each square come from the API I intend to use (Iconify)*/}
      {tileError && <p role="alert">{tileError}</p>}
      {!tileError && <table id="bingo-board" className="bg-white dark:bg-gray-600">
        <caption>Bingo Board</caption>
        <tr>
          <BingoTile tileInfo = {tiles[0]} corner = {"upper-left"} row = {0} col={0} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[1]} row = {0} col={1} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[2]} row = {0} col={2} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[3]} row = {0} col={3} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[4]} corner = {"upper-right"} row = {0} col={4} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile tileInfo = {tiles[5]} row = {1} col={0} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[6]} row = {1} col={1} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[7]} row = {1} col={2} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[8]} row = {1} col={3} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[9]} row = {1} col={4} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile tileInfo = {tiles[10]} row = {2} col={0} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[11]} row = {2} col={1} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[12]} row = {2} col={2} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[13]} row = {2} col={3} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[14]} row = {2} col={4} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile tileInfo = {tiles[15]} row = {3} col={0} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[16]} row = {3} col={1} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[17]} row = {3} col={2} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[18]} row = {3} col={3} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[19]} row = {3} col={4} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile tileInfo = {tiles[20]} corner = {"lower-left"} row = {4} col={0} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[21]} row = {4} col={1} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[22]} row = {4} col={2} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[23]} row = {4} col={3} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
          <BingoTile tileInfo = {tiles[24]} corner = {"lower-right"} row = {4} col={4} onBoardChange={handleBoardChange} board={bingoBoard}>

          </BingoTile>
        </tr>
      </table>}
    </section>
  </main>
  );
}