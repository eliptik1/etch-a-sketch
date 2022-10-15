const container = document.querySelector(".container")



for (let j = 1; j <= 16; j++) {
    for (let i = 1; i <= 16; i++) {
        const pixel2 = document.createElement("div")
        pixel2.classList.add("pixel")
        container.append(pixel2)
    }
}

const selection = document.getElementsByClassName("pixel")
for (let i = 0; i < selection.length; i++) {
    selection[i].addEventListener("mouseover", hover)

    function hover() {
        selection[i].classList.add("color")
    }
}





