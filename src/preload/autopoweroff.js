const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    poweroff: () => {
        ipcRenderer.send("poweroff");
    },
    cancelShutdown: () => {
        ipcRenderer.send("cancelShutdown");
    },
});
