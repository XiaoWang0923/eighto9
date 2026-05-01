function functionbtnChange(btn, enable) {
    if (enable) {
        btn.className = "functionbtn btn-enable";
        btn.innerHTML = "启用";
    } else {
        btn.className = "functionbtn btn-disable";
        btn.innerHTML = "关闭";
    }
}

const autopoweroffBtn = document.getElementById("autopoweroff");
window.addEventListener("DOMContentLoaded", async () => {
    const settings = await window.electronAPI.getSettings();
    functionbtnChange(autopoweroffBtn, settings["autopoweroff"]["enable"]);
    autopoweroffBtn.addEventListener("click", () => {
        if (autopoweroffBtn.className === "functionbtn btn-enable") {
            functionbtnChange(autopoweroffBtn, false);
        } else {
            functionbtnChange(autopoweroffBtn, true);
        }
        if (autopoweroffBtn.innerHTML === "启用") {
            window.electronAPI.switchAutopoweroffEnability(true);
        } else {
            window.electronAPI.switchAutopoweroffEnability(false);
        }
    });
});

document.getElementById("devtoolsbtn").onclick = () => {
    window.electronAPI.openDevtoolsOnMain();
};

document.getElementById("updatebtn").onclick = () => {
    window.electronAPI.checkUpdate();
};

document.getElementById("aboutbtn").onclick = () => {
    window.electronAPI.openAbout();
};

document.getElementById("settingsbtn").onclick = () => {
    window.electronAPI.openSettings();
};
