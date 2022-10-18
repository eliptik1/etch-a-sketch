const container = document.querySelector(".container")
const btn = document.querySelector("#btn")
const btn2 = document.querySelector("#btn2")
const color2 = document.querySelector("#color2")
const color3 = document.querySelector("#color3")
const eraser = document.querySelector("#eraser")
const clear = document.querySelector("#clear")
btn.addEventListener("click", removePad)
color2.addEventListener("click", changeColor)
color3.addEventListener("click", rainbowColor)
eraser.addEventListener("click", eraseColor)
clear.addEventListener("click", clearPad)



let rainbowOn = false
let colorPixel = "#297bff"
let width = 600;
let height = width;
let row = 16;
let column = row;

createPad();

function changeColor() {
    rainbowOn = false;
    console.log(colorPicker.value)
    colorPixel = colorPicker.value
    color2.classList.add("btnSelected")
    color3.classList.remove("btnSelected")
    eraser.classList.remove("btnSelected")

}
function rainbowColor() {
    rainbowOn = true;
    color2.classList.remove("btnSelected")
    color3.classList.add("btnSelected")
    eraser.classList.remove("btnSelected")
}

function removePad() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""
    row = prompt("Set the grid size", "16");
    column = row;
    createPad();
}

function eraseColor() {
    rainbowOn = false;
    colorPixel = "white"
    color2.classList.remove("btnSelected")
    color3.classList.remove("btnSelected")
    eraser.classList.add("btnSelected")
}

function clearPad() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""
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
                selection[i].setAttribute("style", `background-color: ${colorPixel}; width: ${width / row}px; height: ${height / column}px`)
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

container.addEventListener("mouseover", () => {
    if (rainbowOn) {
        let randomNumber = Math.floor(Math.random() * 255)

        let col1 = `rgb(255,0,${randomNumber})`
        let col2 = `rgb(${randomNumber},0,255)`
        let col3 = `rgb(0,${randomNumber},255)`
        let col4 = `rgb(0,255,${randomNumber})`
        let col5 = `rgb(${randomNumber},255,0)`
        let col6 = `rgb(255,${randomNumber},0)`

        const pickCol = [col1, col2, col3, col4, col5, col6]
        colorPixel = pickCol[Math.floor(Math.random() * pickCol.length)]
        console.log(colorPixel)
    }
})


const colorPicker = document.querySelector("#colorPicker")

colorPicker.addEventListener("change", updateColor)

function updateColor() {
    rainbowOn = false;
    color2.classList.add("btnSelected")
    color3.classList.remove("btnSelected")
    eraser.classList.remove("btnSelected")
    colorPixel = colorPicker.value
}