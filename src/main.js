const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
// when packeage
// const update = require(path.join(__dirname, "update.js"));
// // const autopoweroff = require(path.join(__dirname, "autopoweroff.js"));
// const settings = require(path.join(__dirname, "settings.js"));

// when develop
const update = require("./update.js");
// const autopoweroff = require("./autopoweroff.js");
const settings = require("./settings.js");

let mainWindow = null;
let aboutWindow = null; // 用于防止多个aboutWindow造成openDevtools错误
let settingsWindow = null; // 用于防止多个settingsWindow造成openDevtools错误
let appTray = null;

function createMainWindow(isNotHidden) {
    mainWindow = new BrowserWindow({
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
        show: false,
    });

    ipcMain.on("openDevtoolsOnMain", () => {
        mainWindow.webContents.openDevTools();
    });
    ipcMain.on("openAbout", () => {
        createAboutWindow();
    });
    ipcMain.on("openSettings", () => {
        createSettingsWindow();
    });
    update.initUpdater();

    mainWindow.loadURL(path.join(__dirname, "/html/main.html"));
    if (isNotHidden) {
        mainWindow.show();
    }
}

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

function createSettingsWindow() {
    // 确保只有一个settingsWindow
    if (settingsWindow && !settingsWindow.isDestroyed()) {
        settingsWindow.focus();
        return;
    }
    settingsWindow = new BrowserWindow({
        width: 450,
        height: 600,
        titleBarStyle: "hidden",
        titleBarOverlay: {
            height: 33,
            color: "#2d2d30",
            symbolColor: "#ffffff",
        },
        webPreferences: {
            preload: path.join(__dirname, "/preload/settings.js"),
        },
        backgroundColor: "#000000",
    });

    ipcMain.on("openDevtoolsOnSettings", () => {
        settingsWindow.webContents.openDevTools();
    });

    settingsWindow.loadURL(path.join(__dirname, "/html/settings.html"));
}

function createAppTray() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "设置",
            click: () => {
                createSettingsWindow();
            },
        },
        {
            label: "关于",
            click: () => {
                createAboutWindow();
            },
        },
        { type: "separator" },
        {
            label: "关闭",
            click: () => {
                app.quit();
            },
        },
    ]);
    appTray = new Tray(path.join(__dirname, "assets/icon.ico"));
    appTray.setToolTip("EightO9");
    appTray.setContextMenu(contextMenu);
    appTray.on("click", () => {
        mainWindow.isDestroyed() ? createMainWindow(true) : mainWindow.focus();
    });
}

app.whenReady().then(() => {
    settings.initSettings();
    ipcMain.handle("getSettings", () => {
        return settings.getAll();
    });
    ipcMain.on("confirmSettings", (event, newSettings) => {
        settings.setAll(newSettings);
        settingsWindow.close();
        settingsWindow.on("closed", () => {
            settingsWindow = null;
        });
    });
    ipcMain.handle("getVersions", () => {
        return {
            app: app.getVersion(),
            node: process.versions.node,
            electron: process.versions.electron,
            chrome: process.versions.chrome,
        };
    });

    if (process.argv.includes("--hidden")) {
        createMainWindow(false);
    } else {
        createMainWindow(true);
    }

    createAppTray();
});

app.on("window-all-closed", () => {
    console.log("main.js: window all closed");
});
