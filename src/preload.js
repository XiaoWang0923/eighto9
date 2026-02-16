const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
    openDevtools: () => {
        ipcRenderer.send("openDevtools")
    }
})