const { autoUpdater } = require("electron-updater")
const { ipcMain } = require("electron")

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function initUpdater() {
    ipcMain.on("checkUpdate", () => {
        autoUpdater.checkForUpdatesAndNotify()
    })

}

module.exports = { initUpdater }
