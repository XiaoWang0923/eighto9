window.addEventListener('DOMContentLoaded', async () => {
    const versions = await window.electronAPI.getVersions();
    const vElem = document.getElementById('versions');
    if (vElem) vElem.innerHTML =
        "App version: V" + versions.app + "<br>" +
        "Node version: V" + versions.node + "<br>" +
        "Chrome version: V" + versions.chrome + "<br>" +
        "Electron version: V" + versions.electron;
    let content = document.getElementById("content")
    content.onclick = () => {
        content.style.setProperty("--bg-img", nextbgImg())
    }
    document.getElementById("devtoolsbtn").onclick = () => {
        window.electronAPI.openDevtoolsOnAbout()
    }
});

let bgIndex = 0
const bgImgs = [
    "../assets/img/bgX.png",
    "../assets/img/bgL.png",
    "../assets/img/bgC.png",
]

function nextbgImg() {
    bgIndex = (bgIndex + 1) % bgImgs.length
    return "url(" + bgImgs[bgIndex] + ")"
}

