export class TileGenerator {
    static difficultyMap = {
        "easy": {
            "easyWeight": 70, "mediumWeight": 25, "hardWeight": 5
        },
        "medium": {
            "easyWeight": 25, "mediumWeight": 60, "hardWeight": 15
        },
        "hard": {
            "easyWeight": 25, "mediumWeight": 25, "hardWeight": 50
        }
    }

    constructor(loadout) {
        this.tileLoadout = loadout;
        this.tileTemplate = null;
        this.ready = this.loadTileTemplate(loadout);
    }

    async loadTileTemplate(loadout) {
        let filename = "";
        switch(loadout) {
            case "fast-and-testimony": 
                filename = "fast_and_testimony.json";
                break;
            case "general-conference":
                filename = "general_conference.json";
                break;
        }

        const url = new URL(`./json/${filename}`, import.meta.url);
        const response = await fetch(url);

        const template = await response.json();
        this.tileTemplate = template;
    }

    withinDifficulty(difficultyRanking, map) {
        const easyLimit = map.easyWeight;
        const mediumLimit = easyLimit + map.mediumWeight;
        const hardLimit = 100; // Equiv to easyLimit + mediumLimit + map["hardWeight"]

        if (difficultyRanking < easyLimit) {
            return "easy";
        } else if (difficultyRanking < mediumLimit) {
            return "medium";
        } else if (difficultyRanking < hardLimit) {
            return "hard";
        }
    }

    generateRandomTile(difficulty) {
        if (this.tileTemplate === null) {
            throw new Error(
                "Tiles have not loaded yet. Await generator.ready first."
            );
        }
        
        const map = TileGenerator.difficultyMap[difficulty];
        const randomDifficultySelect = Math.floor(Math.random() * 100) + 1;
        const tileSelectDifficulty = this.withinDifficulty(randomDifficultySelect, map);
        const matchingTiles = Object.entries(this.tileTemplate).filter(([keys, tile]) => tile.difficulty === tileSelectDifficulty);
        const randomIndex = Math.floor(Math.random() * matchingTiles.length);
        const [selectedKey, selectedTile] = matchingTiles[randomIndex];

        let name = selectedTile.name;
        const variants = selectedTile.variants ?? [];

        if (variants.length > 0) {
            const variantIndex = Math.floor(Math.random() * variants.length);
            const selectedVariant = variants[variantIndex];

            name = name.replace(/%[sf]/g, (placeholder) => {
                if (placeholder === "%s") {
                    return selectedVariant.charAt(0).toUpperCase()
                        + selectedVariant.slice(1);
                }
                return selectedVariant});
        }

        return {...selectedTile, id: selectedKey, name}; // This is the item info that you then use to fill in the name field, etc
    }
};
