function LocationCalculater() {

    const callStack = { x: 0, y: 0, };
    const wepApi = { x: 0, y: 0 };
    const microTast = { x: 0, y: 0 };
    const macroTast = { x: 0, y: 0 };

    const getLocation = (drawPosition) => {
        const drawPositionContainer = document.querySelector(`.${drawPosition}`);
        const rect = drawPositionContainer.getBoundingClientRect();
        callStack.x = rect.left + 40;
        callStack.y = rect.top + rect.height / 2;
        return callStack
    };

    const resetLocation = (type) => {
        if (type === "callStack") {
            callStack.x = 0;
            callStack.y = 0;
        } else if (type === "wepApi") {
            wepApi.x = 0;
            wepApi.y = 0;
        } else if (type === "microTast") {
            microTast.x = 0;
            microTast.y = 0;
        } else if (type === "macroTast") {
            macroTast.x = 0;
            macroTast.y = 0;
        }
    };
    
    return {getLocation, resetLocation}
}

const locationCalculater = LocationCalculater()
export default locationCalculater
