import React from "react";
import './bingo.css';

export function BingoTile(properties) {
    const tileInfo = properties.tileInfo;
    const icon = tileInfo?.icon;
    const marked = !properties.board[properties.row][properties.col];

    function cornerStyle() {
        if (properties.corner === "lower-right") {
            return { borderBottomRightRadius: "20px" };
        }
        if (properties.corner === "lower-left") {
            return { borderBottomLeftRadius: "20px" };
        }
        if (properties.corner === "upper-right") {
            return { borderTopRightRadius: "20px" };
        }
        if (properties.corner === "upper-left") {
            return { borderTopLeftRadius: "20px" };
        }
        return {};
    }

    function updateCell(row, col, value) {
        properties.onBoardChange(prev => {
            const next = [...prev];       // Copy the outer array
            next[row] = [...prev[row]];   // Copy the row being changed
            next[row][col] = value;       // Modify the new row
            return next;
        });
        console.log(properties.board);
    }

    return (
        <td className={marked ? "bingo-tile" : "bg-red-300"} style={cornerStyle()}>
            <button 
                    className=""
                    disabled = {!tileInfo}
                    onClick = {() => {updateCell(properties.row, properties.col, !properties.board[properties.row][properties.col])}}
            >
                {icon && (
                    <img
                    src={`https://api.iconify.design/fluent-emoji-flat/${icon}.svg`}
                    alt={icon}
                    />
                )}
              <p>{tileInfo?.name ?? "Loading..."}</p>
            </button>
        </td>
    )
}