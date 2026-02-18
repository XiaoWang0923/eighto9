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

// TODO
document.getElementById("settingsbtn").onclick = () => {
    alert("前面的功能还是以后再来探索吧！（not finished yet）");
};
