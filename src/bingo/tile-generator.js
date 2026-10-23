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
        this.usedCategories = new Set();
        this.usedTiles = new Set();
        this.usedNames = new Set();
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

        if (!response.ok) {
            throw new Error(`Could not load tile template: ${response.status}`);
        }

        const template = await response.json();
        this.tileTemplate = template;
    }

    withinDifficulty(difficultyRanking, map) {
        const easyLimit = map.easyWeight;
        const mediumLimit = easyLimit + map.mediumWeight;
        const hardLimit = 100; // Equiv to easyLimit + mediumLimit + map["hardWeight"]

        if (difficultyRanking <= easyLimit) {
            return "easy";
        } else if (difficultyRanking <= mediumLimit) {
            return "medium";
        } else if (difficultyRanking <= hardLimit) {
            return "hard";
        }
    }

    generateRandomTile(difficulty, repeatsAllowed = false) {
        if (this.tileTemplate === null) {
            throw new Error(
                "Tiles have not loaded yet. Await generator.ready first."
            );
        }

        const map = TileGenerator.difficultyMap[difficulty];
        if (!map) {
            throw new Error(`Unknown difficulty: ${difficulty}`);
        }

        const availableTiles = [];
        for (const [key, tile] of Object.entries(this.tileTemplate)) {
            if (!repeatsAllowed && !tile["always-repeatable"] && this.usedCategories.has(key)) {
                continue;
            }

            const variants = tile.variants ?? [];
            const availableVariants = [];
            for (let i = 0; i < Math.max(variants.length, 1); i++) {
                const variant = variants[i] ?? null;
                const tileID = JSON.stringify([key, variant]);
                const name = this.formatTileText(tile.name, variant);

                if (repeatsAllowed || (!this.usedTiles.has(tileID) && !this.usedNames.has(name))) {
                    availableVariants.push({variant, variantIndex: i, tileID, name});
                }
            }

            if (availableVariants.length > 0) {
                availableTiles.push({key, tile, availableVariants});
            }
        }

        // Only roll difficulties that still have tiles available.
        const availableDifficulties = Object.keys(TileGenerator.difficultyMap).filter(level =>
            availableTiles.some(entry => entry.tile.difficulty === level)
        );
        const totalWeight = availableDifficulties.reduce((total, level) => total + map[`${level}Weight`], 0);
        if (totalWeight === 0) {
            throw new Error("Not enough unique tiles to fill this board. Add repeatable variants or enable Repeats Allowed.");
        }

        let randomDifficultySelect = Math.random() * totalWeight;
        let tileSelectDifficulty = availableDifficulties[availableDifficulties.length - 1];
        for (const level of availableDifficulties) {
            randomDifficultySelect -= map[`${level}Weight`];
            if (randomDifficultySelect < 0) {
                tileSelectDifficulty = level;
                break;
            }
        }

        const matchingTiles = availableTiles.filter(entry => entry.tile.difficulty === tileSelectDifficulty);
        const randomIndex = Math.floor(Math.random() * matchingTiles.length);
        const {key: selectedKey, tile: selectedTile, availableVariants} = matchingTiles[randomIndex];
        const variantIndex = Math.floor(Math.random() * availableVariants.length);
        const selectedVariant = availableVariants[variantIndex];
        const name = selectedVariant.name;
        const icon = selectedTile.icons?.[selectedVariant.variantIndex] ?? selectedTile.icons?.[0] ?? null;
        const description = this.formatTileText(selectedTile.description, selectedVariant.variant);

        this.usedCategories.add(selectedKey);
        this.usedTiles.add(selectedVariant.tileID);
        this.usedNames.add(name);

        return {...selectedTile, id: selectedKey, tileID: selectedVariant.tileID, variant: selectedVariant.variant, name, description, icon};
    }

    formatTileText(text, variant) {
        if (variant === null) {
            return text;
        }

        return text.replace(/%[sf]/g, (placeholder) => {
            if (placeholder === "%s") {
                return variant.charAt(0).toUpperCase() + variant.slice(1);
            }
            return variant;
        });
    }
};
