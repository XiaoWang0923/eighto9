const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openDevtoolsOnMain: () => {
        ipcRenderer.send("openDevtoolsOnMain");
    },
    checkUpdate: () => {
        ipcRenderer.send("checkUpdate");
    },
    openAbout: () => {
        ipcRenderer.send("openAbout");
    },
    openSettings: () => {
        ipcRenderer.send("openSettings");
    },
    getSettings: () => ipcRenderer.invoke("getSettings"),
    switchAutopoweroffEnability: (enable) =>
        ipcRenderer.send("switchAutopoweroffEnability", enable),
});
