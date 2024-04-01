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
        positionMap[drawPosition].x = rect.left + 135;
        positionMap[drawPosition].y = rect.top + rect.height / 2 + 100;
        return positionMap[drawPosition]
    };

    const getQueueLocation = (drawPosition) => {
        const drawPositionContainer = document.querySelector(`.${drawPosition}`);
        const rect = drawPositionContainer.getBoundingClientRect();
        positionMap[drawPosition].x = rect.left + 100 ;
        positionMap[drawPosition].y = rect.top + rect.height / 2 + 50;
        return positionMap[drawPosition]
    };

    
    return {getLocation, getQueueLocation}
}

const locationCalculater = LocationCalculater()
export default locationCalculater
