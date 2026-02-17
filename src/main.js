const { app, BrowserWindow, ipcMain } = require("electron/main")
const path = require("path")
const update = require(path.join(__dirname, "update.js"))

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            height: 33,
            color: '#2d2d30',
            symbolColor: '#ffffff'
        },
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    mainWindow.loadURL(path.join(__dirname, "main.html"))
    update.initUpdater(mainWindow)
    ipcMain.on("openDevtools", () => {
        mainWindow.webContents.openDevTools()
    })
}

app.whenReady().then(() => {
    createMainWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })

})

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
