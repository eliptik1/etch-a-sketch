const container = document.querySelector(".container")
const btn = document.querySelector("#btn")
const btn2 = document.querySelector("#btn2")
const color2 = document.querySelector("#color2")
btn.addEventListener("click", removePad)
color2.addEventListener("click", changeColor)



let colorPixel = "#297bff"
let width = 600;
let height = width;
let row = 16;
let column = row;
createPad();

function changeColor(){
    colorPixel = "orange"
}

function removePad() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""
    row = prompt("Set the grid size", "16");
    column = row;
    createPad();
}

function createPad() {
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    while (row >= 100) {
        alert("You should set the grid size smaller than 100")
        row = prompt("Set the grid size", "16");
        column = row
    }

    for (let j = 1; j <= column; j++) {
        for (let i = 1; i <= row; i++) {
            const pixel2 = document.createElement("div")
            pixel2.classList.add("pixel")
            pixel2.style.width = `${width / row}px`
            pixel2.style.height = `${height / column}px`
            container.append(pixel2)
        }
    }

    const selection = document.getElementsByClassName("pixel")

    for (let i = 0; i < selection.length; i++) {
        const container = document.querySelector(".container")
        selection[i].addEventListener("mousemove", hover)
        function hover() {
            if (isClicked) {
                selection[i].setAttribute("style",`background-color: ${colorPixel}; width: ${width / row}px; height: ${height / column}px`)
            }
        }
    }
}

let isClicked = false;

container.addEventListener("mousedown", () => {
    isClicked = true;
})

container.addEventListener("mouseup", () => {
    isClicked = false;
})

container.addEventListener("mouseleave", () => {
    isClicked = false;
})

const colorPicker = document.querySelector("#colorPicker")

colorPicker.addEventListener("change" , updateColor)

function updateColor(){
    colorPixel = colorPicker.value
}