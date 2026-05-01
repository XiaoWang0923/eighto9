const { exec } = require("child_process");
const path = require("path");
const { BrowserWindow, ipcMain } = require("electron");

let now = null;
let enable = null;
let time1 = null;
let time2 = null;
let timer1 = null;
let timer2 = null;
let countdownWindow = null;

ipcMain.on("cancelShutdown", () => {
    countdownWindow.close();
    countdownWindow = null;
});

function setTimer(settings) {
    now = new Date();
    enable = settings["autopoweroff"]["enable"];

    if (enable) {
        // time1
        let [time1Hour, time1Min] = settings["autopoweroff"]["time"][0]
            .split(":")
            .map(Number);
        time1 = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            time1Hour,
            time1Min,
        );
        if (time1 <= now) {
            time1.setDate(time1.getDate() + 1);
        }
        console.log("autopoweroff.js: time1 ", time1);

        const delayMs1 = time1 - now;
        console.log(
            `autopoweroff.js: shut down at ${time1.toLocaleString()}, ${Math.round(delayMs1 / 1000)}s remained`,
        );
        timer1 = setTimeout(() => {
            createCountdownWindow();
        }, delayMs1);

        // time2
        let [time2Hour, time2Min] = settings["autopoweroff"]["time"][1]
            .split(":")
            .map(Number);
        time2 = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            time2Hour,
            time2Min,
        );
        if (time2 <= now) {
            time2.setDate(time2.getDate() + 1);
        }
        console.log("autopoweroff.js: time2 ", time2);

        const delayMs2 = time2 - now;
        console.log(
            `autopoweroff.js: shut down at ${time2.toLocaleString()}, ${Math.round(delayMs2 / 1000)}s remained`,
        );
        timer2 = setTimeout(() => {
            createCountdownWindow();
        }, delayMs2);
    } else {
        console.log("autopoweroff.js: timer cleared");
        clearTimeout(timer1);
        clearTimeout(timer2);
    }
}

function createCountdownWindow() {
    countdownWindow = new BrowserWindow({
        width: 300,
        height: 240,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, "/preload/autopoweroff.js"),
        },
        backgroundColor: "#000000",
        resizable: false,
        alwaysOnTop: true,
    });
    ipcMain.on("poweroff", () => {
        poweroff();
    });
    countdownWindow.loadURL(path.join(__dirname, "/html/autopoweroff.html"));
}

function poweroff() {
    console.log("autopoweroff.js: poweroff");
    exec("shutdown /s /t 0", (error) => {
        if (error) {
            console.error("autopoweroff.js: poweroff() failed:", error);
        } else {
            console.log("autopoweroff.js: shut down...");
        }
    });
}

module.exports = {
    setTimer,
};
