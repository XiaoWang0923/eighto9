const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
    openDevtoolsOnSettings: () => {
        ipcRenderer.send("openDevtoolsOnSettings");
    },
    getSettings: () => ipcRenderer.invoke("getSettings"),
    confirmSettings: (settings) =>
        ipcRenderer.send("confirmSettings", settings),
});
