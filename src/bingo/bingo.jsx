import React from 'react';
import './bingo.css';
import { TileGenerator } from './tile-generator'
import { BingoTile } from './bingo-tile';

export function Bingo(properties) {

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
          <BingoTile settings = {properties.settings} corner = {"upper-left"}>

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} corner = {"upper-right"}>

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
          <BingoTile settings = {properties.settings} >

          </BingoTile>
        </tr>
        <tr>
          <BingoTile settings = {properties.settings} corner = {"lower-left"}>

          </BingoTile>
          <BingoTile settings = {properties.settings}>

          </BingoTile>
          <BingoTile settings = {properties.settings}>

          </BingoTile>
          <BingoTile settings = {properties.settings}>

          </BingoTile>
          <BingoTile settings = {properties.settings} corner = {"lower-right"}>

          </BingoTile>
        </tr>
      </table>
    </section>
  </main>
  );
}