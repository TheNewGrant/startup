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
  const [score, setScore] = React.useState(0);
  const [multiBingoBonuses, setMultiBingoBonuses] = React.useState(
    Array.from({length: 5}, () => Array(5).fill(0))
  );
  const scoreID = React.useRef("");

  const {
    loadout,
    difficulty,
    repeatsAllowed = false,
    focusMode = false,
  } = properties.settings;
  const [tiles, setTiles] = React.useState([]);
  const [tileError, setTileError] = React.useState("");
  const [readyBoard, setReadyBoard] = React.useState("");
  const [focusHidden, setFocusHidden] = React.useState(false);
  const boardKey = JSON.stringify([
    properties.userName,
    properties.gameID,
    properties.gameSession,
    properties.seed,
    loadout,
    difficulty,
    repeatsAllowed
  ]);

  // Loading Game Effect
  React.useEffect( () => {
    let cancelled = false;
    setReadyBoard("");
    setTiles([]);
    setTileError("");

    let savedGame = null;

    try {
      const progressText = localStorage.getItem("bingoProgress");
      if (progressText) {
        savedGame = JSON.parse(progressText);
      }
    }
    catch (err) {
      console.error("Could not load saved progress", err);
    }

    if (savedGame && savedGame.boardKey === boardKey) {
      setTiles(savedGame.tiles);
      setBingoBoard(savedGame.bingoBoard);
      setRowBingos(savedGame.rowBingos);
      setColBingos(savedGame.colBingos);
      setDiaBingos(savedGame.diaBingos);
      setPercentFilled(savedGame.percentFilled);
      setScore(savedGame.score);
      setMultiBingoBonuses(savedGame.multiBingoBonuses);
      scoreID.current = savedGame.scoreID;
      setReadyBoard(boardKey);

      return () => cancelled = true;
    }

    setBingoBoard(Array.from({length: 5}, () => Array(5).fill(false)));
    setRowBingos(0);
    setColBingos(0);
    setDiaBingos(0);
    setPercentFilled(0);
    setScore(0);
    setMultiBingoBonuses(Array.from({length: 5}, () => Array(5).fill(0)));
    scoreID.current = crypto.randomUUID();

    async function loadGenerator() {
      try {
        const tileGenerator = new TileGenerator(loadout, properties.seed);
        await tileGenerator.ready;
        if (cancelled) {
          return;
        }

        const generatedTiles = [];
        for (let i = 0; i < 25; i++) {
          generatedTiles.push(tileGenerator.generateRandomTile(difficulty, repeatsAllowed));
        }

        setTiles(generatedTiles);
        setReadyBoard(boardKey);
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
  }, [
    boardKey,
    loadout,
    difficulty,
    repeatsAllowed,
    properties.seed
  ]);

  // Progress Saving Effect
  React.useEffect( () => {
    if (readyBoard !== boardKey || tiles.length !== 25) {
      return;
    }

    const savedGame = {
      boardKey: boardKey,
      tiles: tiles,
      bingoBoard: bingoBoard,
      rowBingos: rowBingos,
      colBingos: colBingos,
      diaBingos: diaBingos,
      percentFilled: percentFilled,
      score: score,
      multiBingoBonuses: multiBingoBonuses,
      scoreID: scoreID.current
    };

    try {
      localStorage.setItem("bingoProgress", JSON.stringify(savedGame));
    }
    catch (err) {
      console.error("Could not save bingo progress", err);
      setTileError("Could not save progress. Check that browser storage is available before refreshing.");
    }
  }, [
    readyBoard,
    boardKey,
    tiles,
    bingoBoard,
    rowBingos,
    colBingos,
    diaBingos,
    percentFilled,
    score,
    multiBingoBonuses
  ]);

  // Focus Mode Effect
  React.useEffect(() => {
    setFocusHidden(false);

    // Start the cycle only once the current board is ready.
    if (!focusMode || readyBoard !== boardKey) {
      return;
    }

    const visibleDuration = 60 * 1000;     // 1 minute
    const hiddenDuration = 5 * 60 * 1000;  // 5 minutes
    // const visibleDuration = 5 * 1000;   // 5 seconds
    // const hiddenDuration = 10 * 1000;   // 10 seconds
    const cycleDuration = visibleDuration + hiddenDuration;
    const startedAt = Date.now();

    function updateVisibility() {
      const elapsed = Date.now() - startedAt;
      const positionInCycle = elapsed % cycleDuration;

      setFocusHidden(positionInCycle >= visibleDuration);
    }

    const timer = window.setInterval(updateVisibility, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [focusMode, readyBoard, boardKey]);

  const boardIsHidden =
    focusMode && readyBoard === boardKey && focusHidden;

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

  function detectBingo(newBoard) {
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

    const newTotal = numRowBingos + numColBingos + numDiagonalBingos;

    setRowBingos(numRowBingos);
    setColBingos(numColBingos);
    setDiaBingos(numDiagonalBingos);

    return newTotal;
  }

    async function saveScore(score, newPercentFilled, bingos, announceScore) {
      const date = new Date().toLocaleDateString();
      const newScore = {
        id: scoreID.current,
        name: properties.userName,
        score: score,
        fill: newPercentFilled,
        bingos: bingos,
        date: date
      };

      if (announceScore) {
        const eventType = newPercentFilled === 100 ? GameEvent.End : GameEvent.NewScore;
        GameNotifier.broadcastEvent(properties.userName, eventType, newScore);
      }

      updateScoresLocal(newScore);
    }

  function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    scores = scores.filter(prevScore => prevScore.id !== newScore.id);

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
      if (readyBoard !== boardKey) {
        return;
      }

      const newBoard = updateBoard(bingoBoard);
      const previousTotal = rowBingos + colBingos + diaBingos;
      const newPercentFilled = countFilled(newBoard);
      const newTotal = detectBingo(newBoard);
      const newBonuses = multiBingoBonuses.map(row => [...row]);
      const difficultyPoints = {easy: 1, medium: 2, hard: 3};
      let newScore = 0;

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (newBoard[i][j] !== bingoBoard[i][j]) {
            if (newBoard[i][j] && newTotal - previousTotal > 1) {
              newBonuses[i][j] = 10;
            } else {
              newBonuses[i][j] = 0;
            }
          }

          if (newBoard[i][j] === true) {
            const tile = tiles[i * 5 + j];
            newScore += difficultyPoints[tile?.difficulty] ?? 2;
            newScore += newBonuses[i][j];
          }
        }
      }

      newScore += newTotal * 5;

      if (newPercentFilled === 100) {
        newScore += 20;
      }

      setBingoBoard(newBoard);
      setMultiBingoBonuses(newBonuses);
      setScore(newScore);

      saveScore(newScore, newPercentFilled, newTotal, newTotal > previousTotal);
    }

  return (
    <main id="bingo-page" className="dark:bg-slate-600">
    <section id="realtime-updates" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      <p id="game-id"><b>Game ID:</b> {properties.gameID}</p>
      <p id="game-seed"><b>Seed:</b> {properties.seed}</p>
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
        <input className="bg-white dark:bg-gray-700" type="text" id="count" value={score} readOnly />
        <p id="bingo-count">
          {rowBingos + colBingos + diaBingos} {rowBingos + colBingos + diaBingos === 1 ? "bingo" : "bingos"}
          {percentFilled === 100 ? " - Blackout!" : ""}
        </p>
      </div>

    </section>
    <section id="board-section" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      {/*Bingo Table: The images in each square come from the API I intend to use (Iconify)*/}
      {tileError && <p role="alert">{tileError}</p>}
      {!tileError && <table
        id="bingo-board"
        className={`bg-white dark:bg-gray-600 ${
          boardIsHidden ? "focus-hidden" : ""
        }`}
        aria-hidden={boardIsHidden ? true : undefined}
      >
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