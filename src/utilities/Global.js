//
export  function setGlobal(options){
    var global = typeof window !== "undefined" ? window : this;
    if (!global.document) {
        throw new Error("react-view requires a window with a document");
    }
    for (var key in options) {
        global[key] = options[key];
    }
}

