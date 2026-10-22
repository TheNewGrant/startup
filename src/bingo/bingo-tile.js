
var tileTemplate

async function loadTileTemplate(loadout) {
    if (loadout == "fast-and-testimony") {
        const templateJSON = await fetch("./json/fast_and_testimony.json");
        tileTemplate = await templateJSON.json();
    } else if (loadout == "general-conference") {
        const templateJSON = await fetch("./json/general_conference.json");
        tileTemplate = await templateJSON.json();
    }
}

function generateRandomTile() {
    
}

