document.getElementById("devtoolsbtn").onclick = () => {
    window.electronAPI.openDevtools()
}

document.getElementById("updatebtn").onclick = () => {
    window.electronAPI.checkUpdate()
}