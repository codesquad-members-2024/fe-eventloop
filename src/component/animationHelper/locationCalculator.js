function LocationCalculater() {
    const positionMap = {
        'call-stack-container': { x: 0, y: 0, },
        'wep-Api-container': { x: 0, y: 0 },
        'microtask-container': { x: 0, y: 0 },
        'macrotask-container': { x: 0, y: 0 },
    }

    const getLocation = (drawPosition) => {
        const drawPositionContainer = document.querySelector(`.${drawPosition}`);
        const rect = drawPositionContainer.getBoundingClientRect();
        positionMap[drawPosition].x = rect.left;
        positionMap[drawPosition].y = rect.top + rect.height / 2 - positionMap[drawPosition].y;
        return positionMap[drawPosition]
    };

    
    return {getLocation}
}

const locationCalculater = LocationCalculater()
export default locationCalculater
