const { autoUpdater } = require("electron-updater")
const { ipcMain } = require("electron/main")
const log = require("electron-log")

log.transports.file.level = "info"
autoUpdater.logger = log

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function initUpdater(mainWindow) {
    ipcMain.on("checkUpdate", () => {
        autoUpdater.checkForUpdatesAndNotify(mainWindow)
    })

}

module.exports = { initUpdater }
