document.getElementById("devtoolsbtn").onclick = () => {
    window.electronAPI.openDevtools()
}

document.getElementById("updatebtn").onclick = () => {
    window.electronAPI.checkUpdate()
}

document.getElementById("aboutbtn").onclick = () => {
    window.electronAPI.openAbout()
}

document.getElementById("settingsbtn").onclick = () => {
    alert("前面的功能还是以后再来探索吧！（not finished yet）")
}