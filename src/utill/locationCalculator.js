function LocationCalculater() {
    const callStack = { x: 0, y: 0 };
    const wepApi = { x: 0, y: 0 };
    const microTast = { x: 0, y: 0 };
    const macroTast = { x: 0, y: 0 };

    const getCallStackLocation = () => {
        const callStackContainer = document.querySelector(".call-stack-container");
        const rect = callStackContainer.getBoundingClientRect();
        callStack.x = (rect.left + (rect.width / 2)) - 105;
        callStack.y = (rect.top + rect.height / 2) - callStack.y;
        return callStack
    };

    const getWepApiLocation = () => {
        const wepApiContainer = document.querySelector(".wep-Api-container");
        const rect = wepApiContainer.getBoundingClientRect();
        wepApi.x = (rect.left + (rect.width / 2)) - 105;
        wepApi.y = (rect.top + rect.height / 2) - wepApi.y;
        return wepApi
    }

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
    
    

    return {getCallStackLocation, resetLocation, getWepApiLocation}
}

const locationCalculater = LocationCalculater()
export default locationCalculater
