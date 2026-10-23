import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  // Demonstrates rendering an array with React
  const personalRows = [];
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      const bingos = score.bingos ?? score.score;
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
          <td>{score.fill}</td>
          <td>{bingos} {bingos === 1 ? "bingo" : "bingos"}{score.fill === 100 ? " - Blackout!" : ""}</td>
          <td>{score.date}</td>
        </tr>
      );
      personalRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.score}</td>
          <td>{score.fill}</td>
          <td>{bingos} {bingos === 1 ? "bingo" : "bingos"}{score.fill === 100 ? " - Blackout!" : ""}</td>
          <td>{score.date}</td>
        </tr>
      )
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className="dark:bg-slate-600">
      <section id="global-scores" className="bg-yellow-200">
        <h1 className="scores-label">Global Scores</h1>
        {/* This is a preview of how both Websocket and MongoDB will be used once implemented */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Fill %</th>
              <th># Bingos</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scoreRows}
          </tbody>
        </table>
      </section>
      <section id="personal-scores" className="bg-red-200">
        <h1 className="scores-label">Your scores</h1>
        {/*  This is a preview of how MongoDB will be implemented to see past scores */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>Fill %</th>
              <th># Bingos</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {personalRows}
          </tbody>
        </table>
      </section>
    </main>
  );
}