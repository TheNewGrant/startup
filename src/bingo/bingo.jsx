import React from 'react';
import './bingo.css';

export function Bingo() {
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
        <label for="count">Score</label>
        <input className="bg-white dark:bg-gray-700" type="text" id="count" value="--" readonly />
      </div>

    </section>
    <section id="board-section" className="bg-gray-200 dark:bg-gray-500 dark:text-white">
      {/*Bingo Table: The images in each square come from the API I intend to use (Iconify)*/}
      <table id="bingo-board" className="bg-white dark:bg-gray-600">
        <caption>Bingo Board</caption>
        <tr>
          <td className="bingo-tile" style={{ borderTopLeftRadius: "20px" }}>
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/alarm-clock.svg" alt="alarm clock"/>
              <p>Neighbor falls asleep</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/bacon.svg" alt="bacon"/>
              <p>Child caught snacking</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/boy-medium.svg" alt="boy"/>
              <p>Boy bears testimony</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/balloon.svg" alt="balloon"/>
              <p>Speaker off topic</p>

            </button>
          </td>
          <td className="bingo-tile" style={{ borderTopRightRadius: "20px"}}>
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/bat.svg" alt="bat"/>
              <p>Animal/Insect distraction</p>

            </button>
          </td>
        </tr>
        <tr>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/blue-book.svg" alt="blue book"/>
              <p>Book of Mormon cited</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/call-me-hand.svg" alt="call me hand"/>
              <p>Phone rings</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/castle.svg" alt="castle"/>
              <p>Topic: Heaven</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/cinema.svg" alt="cinema"/>
              <p>Church activity mentioned</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/crayon.svg" alt="crayon"/>
              <p>Child coloring</p>

            </button>
          </td>
        </tr>
        <tr>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/dna.svg" alt="dna"/>
              <p>Topic: Family History</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/face-with-raised-eyebrow.svg" alt="face with raised eyebrow"/>
              <p>Questionable topic mentioned</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/female-sign.svg" alt="female sign"/>
              <p>Woman bears testimony</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/flamingo.svg" alt="flamingo"/>
              <p>Pink article of clothing</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/frowning-face-with-open-mouth.svg" alt="frowning face with open mouth"/>
              <p>Shocking turn of events</p>

            </button>
          </td>
        </tr>
        <tr>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/glasses.svg" alt="glasses"/>
              <p>Glasses worn by speaker</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/guitar.svg" alt="guitar"/>
              <p>Musical Number</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false"
                src="https://api.iconify.design/fluent-emoji-flat/hand-with-index-finger-and-thumb-crossed-medium.svg" alt="hand with index finger and thumb crossed"/>
              <p>Coincidence/luck mentioned</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/heart-hands-medium.svg" alt="heart hands"/>
              <p>Topic: Love</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/hospital.svg" alt="hospital"/>
              <p>Miracle story</p>

            </button>
          </td>
        </tr>
        <tr>
          <td className="bingo-tile" style={{borderBottomLeftRadius: "20px"}}>
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/infinity.svg" alt="infinity"/>
              <p>Topic: Atonement</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/joker.svg" alt="joker"/>
              <p>Joke told (laughter required)</p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/knot.svg" alt="knot"/>
              <p>Bow/Bracelet/Necklace article </p>

            </button>
          </td>
          <td className="bingo-tile">
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/laptop.svg" alt="laptop"/>
              <p>Phone used on podium</p>

            </button>
          </td>
          <td className="bingo-tile" style={{ borderBottomRightRadius: "20px" }}>
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <img draggable="false" src="https://api.iconify.design/fluent-emoji-flat/light-blue-heart.svg" alt="light blue heart"/>
              <p>Topic: Service</p>

            </button>
          </td>
        </tr>
      </table>
    </section>
  </main>
  );
}