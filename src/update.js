const { autoUpdater } = require("electron-updater")
const { ipcMain } = require("electron/main")

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function initUpdater(mainWindow) {
    ipcMain.on("checkUpdate", () => {
        autoUpdater.checkForUpdatesAndNotify(mainWindow)
    })

}

module.exports = { initUpdater }
