const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openDevtoolsOnAbout: () => {
        ipcRenderer.send("openDevtoolsOnAbout");
    },
    getVersions: () => ipcRenderer.invoke("getVersions"), // invoke version
});
