const { autoUpdater } = require("electron-updater")
const { ipcMain } = require("electron")

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function initUpdater(mainWindow) {
    ipcMain.on("checkUpdate", () => {
        autoUpdater.checkForUpdatesAndNotify(mainWindow)
    })

}

module.exports = { initUpdater }
