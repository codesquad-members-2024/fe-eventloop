export function Box(funcString, id) {
    this.funcString = funcString;
    this.id = id;
}

Box.prototype.creatBox = function () {
    const divEl = document.createElement("div");
    divEl.id = `${this.id}`;
    divEl.className = "call-stack";
    divEl.innerText = `${this.funcString}`;
    return divEl;
};

export const renderFunc = (node) => {
    const bodyEl = document.querySelector(".engine-container");
    bodyEl.append(node);
};

