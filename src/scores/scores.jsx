import React from 'react';
import './scores.css';

export function Scores() {
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
            <tr>
              <td>1</td>
              <td>Mason Grant</td>
              <td>50</td>
              <td>100%</td>
              <td>Blackout</td>
              <td>May 20, 2026</td>
            </tr>
            <tr>
              <td>2</td>
              <td>James Spencer</td>
              <td>21</td>
              <td>60%</td>
              <td>3 Bingos</td>
              <td>May 20, 2026</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Anna Smith</td>
              <td>7</td>
              <td>20%</td>
              <td>1 Bingo</td>
              <td>July 3, 2026</td>
            </tr>
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
            <tr>
              <td>1</td>
              <td>50</td>
              <td>100%</td>
              <td>Blackout</td>
              <td>May 20, 2026</td>
            </tr>
            <tr>
              <td>2</td>
              <td>21</td>
              <td>60%</td>
              <td>3 Bingos</td>
              <td>May 28, 2026</td>
            </tr>
            <tr>
              <td>3</td>
              <td>14</td>
              <td>40%</td>
              <td>2 Bingos</td>
              <td>April 5, 2026</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}