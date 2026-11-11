import React, { useEffect, useState } from "react";
import './bingo.css';

export function BingoTile(properties) {
    const tileInfo = properties.tileInfo;
    const icon = tileInfo?.icon;
    const [iconImage, setIconImage] = useState(null);

    useEffect(() => {
        if (!icon) {
            setIconImage(null);
            return;
        }
        const controller = new AbortController();
        let objectUrl;
        setIconImage(null);

        async function fetchIcon() {
            try {
                // Fetch the icon from the Iconify API
                const response = await fetch(
                    `https://api.iconify.design/fluent-emoji-flat/${encodeURIComponent(icon)}.svg`,
                    { signal: controller.signal }
                );
                if (!response.ok) {
                    throw new Error(`Icon request failed: ${response.status}`);
                }
                const imageBlob = await response.blob();
                if (controller.signal.aborted) return;
                objectUrl = URL.createObjectURL(imageBlob);
                setIconImage({ name: icon, url: objectUrl });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(`Could not load icon "${icon}":`, error);
                }
            }
        }

        fetchIcon();
        return () => {
            controller.abort();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [icon]);
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
                {iconImage && iconImage.name === icon && (
                    <img
                        src={iconImage.url}
                        alt={icon}
                    />
                )}
              <p>{tileInfo?.name ?? "Loading..."}</p>
            </button>
        </td>
    )
}