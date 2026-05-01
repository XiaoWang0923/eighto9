const { app } = require("electron");
const path = require("path");
const fs = require("fs");

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
        }
    } catch (e) {
        console.error("settings.js: initSettings() failed", e);
    }
}

function readSettings() {
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    } catch (e) {
        console.error("settings.js: readSettings() failed", e);
    }
}

async function writeSettings() {
    try {
        await fs.promises.writeFile(settingsPath, JSON.stringify(settings));
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
    writeSettings(newsettings);
    setAutoStart();
}

function get(module, key) {
    return settings[module][key];
}

// 无检查
function set(module, key, value) {
    settings[module][key] = value;
    writeSettings(settings);
    setAutoStart();
}

function setAutoStart() {
    if (get("main", "autoStart")) {
        app.setLoginItemSettings({
            openAtLogin: true,
            args: ["--hidden"],
        });
    } else {
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
