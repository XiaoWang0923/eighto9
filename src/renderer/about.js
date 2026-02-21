// 在加载后与主进程通信，返回版本信息，注册一些事件监听
window.addEventListener("DOMContentLoaded", async () => {
    const versions = await window.electronAPI.getVersions();
    const vElem = document.getElementById("versions");
    if (vElem)
        vElem.innerHTML =
            "App version: V" +
            versions.app +
            "<br>" +
            "Node version: V" +
            versions.node +
            "<br>" +
            "Chrome version: V" +
            versions.chrome +
            "<br>" +
            "Electron version: V" +
            versions.electron;
    // 点击后切换背景图片
    let content = document.getElementById("content");
    content.onclick = () => {
        content.style.setProperty("--bg-img", nextbgImg());
    };
    document.getElementById("devtoolsbtn").onclick = () => {
        window.electronAPI.openDevtoolsOnAbout();
    };
});

// 循环播放背景图片
let bgIndex = 0;
const bgImgs = [
    "../assets/img/bgF.png",
    "../assets/img/bgX.png",
    "../assets/img/bgL.png",
    "../assets/img/bgC.png",
];

function nextbgImg() {
    bgIndex = (bgIndex + 1) % bgImgs.length;
    return "url(" + bgImgs[bgIndex] + ")";
}
