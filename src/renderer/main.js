const btns = document.getElementsByClassName("functionbtn");
// 控制functionbtn的样式切换
for (let btn of btns) {
    btn.addEventListener("click", () => {
        if (btn.className === "functionbtn btn-enable") {
            btn.className = "functionbtn btn-disable";
            btn.innerHTML = "关闭";
        } else {
            btn.className = "functionbtn btn-enable";
            btn.innerHTML = "启用";
        }
    });
}

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
