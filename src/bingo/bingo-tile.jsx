import React, { useEffect } from "react";
import './bingo.css';
import { TileGenerator } from "./tile-generator"

export function BingoTile(properties) {
    const {loadout, difficulty} = properties.settings;
    const [tileInfo, setTileInfo] = React.useState(null);

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

    function Image({tile}) {
        const icon = tile?.icons[Math.floor(Math.random() * tile?.icons.length)]
        return (
            <img
            src={`https://api.iconify.design/fluent-emoji-flat/${icon}.svg`}
            alt={icon}
            />
        )
    }

    return (
        <td className="bingo-tile" style={cornerStyle()}>
            <button className="active:bg-gray-300 dark:active:bg-gray-700">
              <Image tile = {tileInfo}/>
              <p>{tileInfo?.name ?? "Loading..."}</p>
            </button>
        </td>
    )
}