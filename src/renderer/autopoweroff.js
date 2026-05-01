let remaining = 60;
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");
const number4 = document.getElementById("number4");

setInterval(() => {
    flash();
    if (remaining === 0) {
        window.electronAPI.poweroff();
    }
    remaining--;
}, 1000);

function flash() {
    let min = (remaining - (remaining % 60)) / 60;
    let second = remaining % 60;
    number1.innerHTML = (min - (min % 10)) / 10;
    number2.innerHTML = min % 10;
    number3.innerHTML = (second - (second % 10)) / 10;
    number4.innerHTML = second % 10;
}

const delayBtn = document.getElementById("delay");
delayBtn.onclick = () => {
    if (remaining <= 270) {
        remaining += 30;
    } else {
        remaining = 300;
    }
    flash();
};

const cancelBtn = document.getElementById("cancel");
cancelBtn.onclick = () => {
    window.electronAPI.cancelShutdown();
};
