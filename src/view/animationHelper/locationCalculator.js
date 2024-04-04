const LocationCalculator = {
    positionMap: {
        "call-stack-container": { x: 0, y: 0 },
        "wep-Api-container": { x: 0, y: 0 },
        "microtask-container": { x: 0, y: 0 },
        "macrotask-container": { x: 0, y: 0 },
    },

    getPosition(drawPosition, offsetX, offsetY) {
        const drawPositionContainer = document.querySelector(`.${drawPosition}`);
        const rect = drawPositionContainer.getBoundingClientRect();
        this.positionMap[drawPosition].x = rect.left + offsetX;
        this.positionMap[drawPosition].y = rect.top + rect.height / 2 + offsetY;
        return this.positionMap[drawPosition];
    },

    getLocation(drawPosition) {
        return this.getPosition(drawPosition, 180, 100);
    },

    getQueueLocation(drawPosition) {
        return this.getPosition(drawPosition, 100, 50);
    },
};

export default LocationCalculator;
