import React, { useEffect } from "react";
import './bingo.css';
import { TileGenerator } from "./tile-generator"

export function BingoTile(properties) {
    const {loadout, difficulty} = properties.settings;
    const [tileInfo, setTileInfo] = React.useState(null);
    const [marked, setMarked] = React.useState(true);

    useEffect( () => {
        let cancelled = false;

        async function loadGenerator() {
            try {
            const tileGenerator = new TileGenerator(loadout);
            await tileGenerator.ready;

            const generatedTile = await tileGenerator.generateRandomTile(difficulty);
            
            if (!cancelled) {
                setTileInfo(generatedTile);
            }

            }
            catch (err) {
                if (!cancelled) {
                    console.error("Could not load the bingo tile", err);
                }
            }
        }
        loadGenerator();
        
        return () => cancelled = true;
    }, [loadout, difficulty]);

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

    function Image({icon}) {
        return (
            <img
            src={`https://api.iconify.design/fluent-emoji-flat/${icon}.svg`}
            alt={icon}
            />
        )
    }
    const icon = tileInfo?.icons[Math.floor(Math.random() * tileInfo?.icons.length)];
    return (
        <td className={marked ? "bingo-tile" : "bg-red-300"} style={cornerStyle()}>
            <button 
                    className=""
                    onClick = {() => {setMarked(prev => !prev); updateCell(properties.row, properties.col, !properties.board[properties.row][properties.col])}}
            >
              <Image icon = {icon}/>
              <p>{tileInfo?.name ?? "Loading: This is a free space"}</p>
            </button>
        </td>
    )
}