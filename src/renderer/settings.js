window.addEventListener("DOMContentLoaded", async () => {
    const settings = await window.electronAPI.getSettings();
    const toggleOne = document.getElementById("toggleOne");
    const toggleTwo = document.getElementById("toggleTwo");
    const timePicker1 = document.getElementById("timePicker1");
    const timePicker2 = document.getElementById("timePicker2");
    toggleOne.checked = settings["main"]["autoStart"];
    toggleTwo.checked = settings["autopoweroff"]["enable"];
    timePicker1.value = settings["autopoweroff"]["time"][0];
    timePicker2.value = settings["autopoweroff"]["time"][1];
    document.getElementById("confirmbtn").onclick = () => {
        window.electronAPI.confirmSettings({
            main: {
                autoStart: toggleOne.checked,
            },
            autopoweroff: {
                enable: toggleTwo.checked,
                time: [timePicker1.value, timePicker2.value],
            },
        });
    };
    document.getElementById("devtoolsbtn").onclick = () => {
        window.electronAPI.openDevtoolsOnSettings();
    };
});
