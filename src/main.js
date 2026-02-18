const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const update = require(path.join(__dirname, "update.js"));

let aboutWindow = null; // 用于防止多个aboutWindow造成openDevtools错误

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        titleBarOverlay: {
            height: 33,
            color: "#2d2d30",
            symbolColor: "#ffffff",
        },
        webPreferences: {
            preload: path.join(__dirname, "/preload/main.js"),
        },
        backgroundColor: "#000000",
    });
    ipcMain.on("openDevtoolsOnMain", () => {
        mainWindow.webContents.openDevTools();
    });
    ipcMain.on("openAbout", () => {
        createAboutWindow();
    });
    update.initUpdater();

    mainWindow.loadURL(path.join(__dirname, "/html/main.html"));
}

ipcMain.handle("getVersions", () => {
    return {
        app: app.getVersion(),
        node: process.versions.node,
        electron: process.versions.electron,
        chrome: process.versions.chrome,
    };
});

function createAboutWindow() {
    // 确保只有一个aboutWindow
    if (aboutWindow && !aboutWindow.isDestroyed()) {
        aboutWindow.focus();
        return;
    }
    aboutWindow = new BrowserWindow({
        width: 450,
        height: 600,
        titleBarStyle: "hidden",
        titleBarOverlay: {
            height: 33,
            color: "#2d2d30",
            symbolColor: "#ffffff",
        },
        webPreferences: {
            preload: path.join(__dirname, "/preload/about.js"),
        },
        backgroundColor: "#000000",
    });
    ipcMain.on("openDevtoolsOnAbout", () => {
        aboutWindow.webContents.openDevTools();
    });
    aboutWindow.loadURL(path.join(__dirname, "/html/about.html"));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
