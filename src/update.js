const { autoUpdater } = require("electron-updater");
const { ipcMain, dialog } = require("electron");

autoUpdater.forceDevUpdateConfig = true;
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// 把相关事件侦听注册到主进程（在主进程中调用）
function initUpdater(mainWindow) {
    ipcMain.on("checkUpdate", () => {
        autoUpdater.checkForUpdates();
    });
    autoUpdater.on("update-available", (info) => {
        dialog
            .showMessageBox(mainWindow, {
                type: "info",
                title: "发现新版本",
                message: `新版本${info.version}已发布, 是否下载?`,
                buttons: ["下载", "稍后"],
            })
            .then(({ response }) => {
                if (response === 0) autoUpdater.downloadUpdate();
            });
    });
    autoUpdater.on("update-not-available", () => {
        dialog.showMessageBox(mainWindow, {
            type: "info",
            title: "未发现新版本",
            message: "暂未发现新版本哦",
            buttons: ["确定"],
        });
    });
    autoUpdater.on("update-downloaded", () => {
        dialog
            .showMessageBox(mainWindow, {
                type: "info",
                title: "更新就绪",
                message: "新版本已下载, 是否立即重启并安装?",
                buttons: ["安装", "稍后"],
            })
            .then(({ response }) => {
                if (response === 0) autoUpdater.quitAndInstall();
            });
    });
}

module.exports = { initUpdater };
