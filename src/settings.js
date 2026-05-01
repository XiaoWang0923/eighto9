const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const autopoweroff = require("./autopoweroff.js");

const userDataPath = app.getPath("userData");
const settingsPath = path.join(userDataPath, "data", "settings.json");
let settings = null;

async function initSettings() {
    try {
        await fs.promises.mkdir(path.dirname(settingsPath), {
            recursive: true,
        });

        try {
            await fs.promises.access(settingsPath);
            readSettings();
            setAutoStart();
            autopoweroff.setTimer(settings);
            console.log("settings.js: settings applied");
        } catch {
            const defaultSettings = {
                main: {
                    autoStart: true,
                },
                autopoweroff: {
                    enable: true,
                    time: ["12:15", "22:10"],
                },
            };
            await fs.promises.writeFile(
                settingsPath,
                JSON.stringify(defaultSettings, null, 4),
            );
            console.log(
                "settings.js: setting.json has been created.",
                settingsPath,
            );
            readSettings();
            setAutoStart();
            autopoweroff.setTimer(settings);
            console.log("settings.js: settings applied");
        }
    } catch (e) {
        console.error("settings.js: initSettings() failed", e);
    }
}

function readSettings() {
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
        console.log("settings.js: settings:\n", settings);
    } catch (e) {
        console.error("settings.js: readSettings() failed", e);
    }
}

async function writeSettings() {
    try {
        await fs.promises.writeFile(
            settingsPath,
            JSON.stringify(settings, null, 4),
        );
        console.log("settings.js: settings:\n", settings);
    } catch (e) {
        console.error("settings.js: writeSettings() failed", e);
    }
}

function getAll() {
    return settings;
}

// 无检查
function setAll(newsettings) {
    settings = newsettings;
    writeSettings();
    setAutoStart();
    autopoweroff.setTimer(settings);
}

function get(module, key) {
    return settings[module][key];
}

// 无检查
function set(module, key, value) {
    settings[module][key] = value;
    writeSettings(settings);
    setAutoStart();
    autopoweroff.setTimer(settings);
}

function setAutoStart() {
    if (get("main", "autoStart")) {
        console.log("settings.js: autostart set");
        app.setLoginItemSettings({
            openAtLogin: true,
            args: ["--hidden"],
        });
    } else {
        console.log("settings.js: autostart cleard");
        app.setLoginItemSettings({
            openAtLogin: false,
        });
    }
}

module.exports = {
    initSettings,
    getAll,
    setAll,
    get,
    set,
};
