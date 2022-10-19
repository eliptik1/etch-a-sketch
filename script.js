const container = document.querySelector(".container")
const gridSize = document.querySelector("#gridSize")
const sizeText = document.querySelector("#sizeText")
const btn = document.querySelector("#btn")
const btn2 = document.querySelector("#btn2")
const color2 = document.querySelector("#color2")
const color3 = document.querySelector("#color3")
const eraser = document.querySelector("#eraser")
const grid = document.querySelector("#grid")
const clear = document.querySelector("#clear")

color2.addEventListener("click", changeColor)
color3.addEventListener("click", rainbowColor)
eraser.addEventListener("click", eraseColor)
grid.addEventListener("click", toggleGrid)
clear.addEventListener("click", clearPad)

function updateText(){
    sizeText.textContent = `${gridSize.value}x${gridSize.value}`
}

let gridsOn = true;
let rainbowOn = false
let colorPixel = "#297bff"
let width = 500;
let height = width;
let row = 16
let column = row;

gridSize.value = row
sizeText.textContent = `${gridSize.value}x${gridSize.value}`
gridSize.addEventListener("input", updateText)
gridSize.addEventListener("change", removePad)

color2.classList.add("btnSelected")

createPad();

function changeColor() {
    rainbowOn = false;
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

    if(color3.className != "btnSelected"){
        color2.classList.add("btnSelected")
    }
    eraser.classList.remove("btnSelected")
    colorPixel = colorPicker.value

    row = gridSize.value
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

function toggleGrid(){
    const pixels = document.getElementsByClassName("pixel")
    const container = document.querySelector(".container")
    const test = document.querySelector(".pixel")
    grid.classList.toggle("btnSelected")
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].classList.toggle("pixelOutline")
    }
    gridsOn = true;
    if(test.classList.contains("pixelOutline")){
        gridsOn = false;
    }
}

function clearPad() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""
    if(color3.className != "btnSelected"){
        color2.classList.add("btnSelected")  
    }
    
    colorPixel = colorPicker.value
    eraser.classList.remove("btnSelected")
    createPad();
    
}

function createPad() {
    
    container.style.width = `${width}px`
    container.style.height = `${height}px`

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
    if(gridsOn === false){
        const pixels = document.getElementsByClassName("pixel")
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].classList.add("pixelOutline")
        }  
    } else if(gridsOn === true){
        const pixels = document.getElementsByClassName("pixel")
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].classList.remove("pixelOutline")
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