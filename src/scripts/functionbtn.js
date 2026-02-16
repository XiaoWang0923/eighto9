const btns = document.getElementsByClassName("functionbtn")
    for (let btn of btns) {
        btn.addEventListener("click", () => {
            if (btn.className === "functionbtn btn-enable") {
                btn.className = "functionbtn btn-disable"
                btn.innerHTML = "关闭"
            } else {
                btn.className = "functionbtn btn-enable"
                btn.innerHTML = "启用"
            }
        })
    }