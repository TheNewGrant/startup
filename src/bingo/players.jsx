import React from "react";

export function Players() {
    const [events, setEvent] = React.useState([]);

    function createPlayersArray() {
        const messageArray = [];

        messageArray.push(<li className = "player-name">{message}</li>)
        
        return messageArray;
    }

    return (
        <ul className="notification">
            {createPlayersArray()}
        </ul>
    )
}