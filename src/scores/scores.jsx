import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [myScores, setMyScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;

    async function loadScores() {
      try {
        const response = await fetch('/api/scores');
        if (!response.ok) {
          throw new Error(response.status === 401
            ? 'Please log in to view scores.' : 'Could not load global scores.');
        }
        const scores = await response.json();

        const myResponse = await fetch('/api/scores/me');
        if (!myResponse.ok) {
          throw new Error(myResponse.status === 401
            ? 'Please log in to view scores.' : 'Could not load your scores.');
        }
        const myScores = await myResponse.json();

        if (!cancelled) {
          setScores(scores);
          setMyScores(myScores);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadScores();
    return () => { cancelled = true; };
  }, []);

  // Build table rows using the same loop style as the example project.
  const scoreRows = [];
  for (const [i, score] of scores.entries()) {
    scoreRows.push(
      <tr key={score.name + ':' + score.id}>
        <td>{i + 1}</td>
        <td>{score.name.split('@')[0]}</td>
        <td>{score.score}</td>
        <td>{score.fill}%</td>
        <td>{score.bingos}</td>
        <td>{score.date}</td>
      </tr>
    );
  }
  if (!scoreRows.length) {
    scoreRows.push(<tr key='empty'><td colSpan='6'>Be the first to score</td></tr>);
  }

  const myScoreRows = [];
  for (const [i, score] of myScores.entries()) {
    myScoreRows.push(
      <tr key={score.id}>
        <td>{i + 1}</td>
        <td>{score.score}</td>
        <td>{score.fill}%</td>
        <td>{score.bingos}</td>
        <td>{score.date}</td>
      </tr>
    );
  }
  if (!myScoreRows.length) {
    myScoreRows.push(<tr key='empty'><td colSpan='5'>You have no saved scores yet</td></tr>);
  }

  return (
    <main id='scores-page' className='bg-gray-200 dark:bg-gray-500 dark:text-white'>
      <h1>Global Scores</h1>
      {loading && <p>Loading scores...</p>}
      {error && <p role='alert'>{error}</p>}
      {!loading && !error && (
        <>
          <table className='bg-white dark:bg-gray-600'>
            <thead>
              <tr><th>#</th><th>Name</th><th>Score</th><th>Fill %</th><th># Bingos</th><th>Date</th></tr>
            </thead>
            <tbody>{scoreRows}</tbody>
          </table>
          <h1>Your scores</h1>
          <table className='bg-white dark:bg-gray-600'>
            <thead>
              <tr><th>#</th><th>Score</th><th>Fill %</th><th># Bingos</th><th>Date</th></tr>
            </thead>
            <tbody>{myScoreRows}</tbody>
          </table>
        </>
      )}
    </main>
  );
}
