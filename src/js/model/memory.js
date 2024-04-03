import { selectorsMap, FIRST_IDX, EMPTY_LENGTH } from "../util/constants.js";

export class Memory {
    constructor() {
        this.classNameMap = new Map();
        this.setClassNameMap();
    }

    isEmpty = (className) => this.classNameMap.get(className).length === EMPTY_LENGTH;

    getCallBack = (className) => this.classNameMap.get(className).slice(-1)[FIRST_IDX];

    updateStatusByClassName(callBack, className, type) {
        if (type === "push") this.classNameMap.get(className).push(callBack);
        if (type === "pop") this.classNameMap.get(className).pop(callBack);
    }

    setClassNameMap() {
        const mapValue = Object.values(selectorsMap);
        mapValue.forEach((curClass) => this.classNameMap.set(curClass, []));
    }
}
