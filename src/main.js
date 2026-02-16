const { app, BrowserWindow, ipcMain } = require("electron/main")
const path = require("path")

function createMainWindow() {
    const win = new BrowserWindow({
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
    win.loadURL(path.join(__dirname, "main.html"))
    ipcMain.on("openDevtools", () => {
        win.webContents.openDevTools()
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
