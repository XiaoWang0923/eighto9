const { app, BrowserWindow, ipcMain } = require("electron")
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
            preload: path.join(__dirname, "/preload/main.js")
        },
        backgroundColor: "#000000"
    })
    mainWindow.loadURL(path.join(__dirname, "/html/main.html"))
    update.initUpdater(mainWindow)
    ipcMain.on("openDevtools", () => {
        mainWindow.webContents.openDevTools()
    })
    ipcMain.on("openAbout", () => {
        createAboutWindow()
    })
    console.log(app.getVersion())
}

function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            height: 33,
            color: '#2d2d30',
            symbolColor: '#ffffff'
        },
        backgroundColor: "#000000"
    })
    aboutWindow.loadURL(path.join(__dirname, "/html/about.html"))
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
