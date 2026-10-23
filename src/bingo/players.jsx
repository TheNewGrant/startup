import React from "react";
import { GameNotifier, GameEvent } from "./game-notifier";

export function Players() {
  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, []);

  function handleGameEvent(event) {
    setEvent((prevEvents) => {
      let newEvents = [event, ...prevEvents];
      if (newEvents.length > 5) {
        newEvents = newEvents.slice(1, 5);
      }
      return newEvents;
    });
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === GameEvent.End) {
        message = `${event.value.name} scored ${event.value.score} bingo`;
      } else if (event.type === GameEvent.Start) {
        message = `started a new game`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      } else if (event.type === GameEvent.NewScore) {
        message = `${event.value.name} scored a bingo!`;
      }

      messageArray.push(
        <li key={i} className='player-name'>
          {message}
        </li>
      );
    }
    return messageArray;
  }
  return (
      <ul className="notification">
          {createMessageArray()}
      </ul>
  )
}