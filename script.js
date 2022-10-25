const container = document.querySelector(".container")
const gridSize = document.querySelector("#gridSize")
const sizeText = document.querySelector("#sizeText")
const colorBtn = document.querySelector("#colorBtn")
const rainbowBtn = document.querySelector("#rainbow")
const eraser = document.querySelector("#eraser")
const grid = document.querySelector("#grid")
const clear = document.querySelector("#clear")
const brush1 = document.querySelector("#brush1")
const brush2 = document.querySelector("#brush2")

colorBtn.addEventListener("click", changeColor)
rainbowBtn.addEventListener("click", rainbowColor)
eraser.addEventListener("click", eraseColor)
grid.addEventListener("click", toggleGrid)
clear.addEventListener("click", clearPad)
brush1.addEventListener("click", changeBrush1)
brush2.addEventListener("click", changeBrush2)

function updateText() {
    sizeText.textContent = `${gridSize.value}x${gridSize.value}`
}

let colorMode = true;
let brush2on = false;
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
gridSize.addEventListener("change", changeSize)

brush1.classList.add("btnSelected")
colorBtn.classList.add("btnSelected")

createPad();

function changeBrush1() {
    brush1.classList.add("btnSelected")
    brush2.classList.remove("btnSelected")
    brush2on = false;
}
function changeBrush2() {
    brush2.classList.add("btnSelected")
    brush1.classList.remove("btnSelected")
    brush2on = true;
}

function changeColor() {
    colorMode = true;
    rainbowOn = false;
    colorPixel = colorPicker.value
    colorBtn.classList.add("btnSelected")
    rainbowBtn.classList.remove("btnSelected")
    eraser.classList.remove("btnSelected")
}

function rainbowColor() {
    rainbowOn = true;
    colorBtn.classList.remove("btnSelected")
    rainbowBtn.classList.add("btnSelected")
    eraser.classList.remove("btnSelected")
}

function changeSize() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""

    if (rainbowBtn.className != "btnSelected") {
        colorBtn.classList.add("btnSelected")
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
    colorBtn.classList.remove("btnSelected")
    rainbowBtn.classList.remove("btnSelected")
    eraser.classList.add("btnSelected")
}

function toggleGrid() {
    const pixels = document.getElementsByClassName("pixel")
    const container = document.querySelector(".container")
    const test = document.querySelector(".pixel")
    grid.classList.toggle("btnSelected")
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].classList.toggle("pixelOutline")
    }
    gridsOn = true;
    if (test.classList.contains("pixelOutline")) {
        gridsOn = false;
    }
}

function clearPad() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""
    if (rainbowBtn.className != "btnSelected") {
        colorBtn.classList.add("btnSelected")
    }

    colorPixel = colorPicker.value
    eraser.classList.remove("btnSelected")
    createPad();
}

function createPad() {

    container.style.width = `${width}px`
    container.style.height = `${height}px`

        for (let i = 1; i <= row*row; i++) {
            const pixel2 = document.createElement("div")
            pixel2.classList.add("pixel")
            pixel2.style.width = `${width / row}px`
            pixel2.style.height = `${height / column}px`
            pixel2.value1 = i
            pixel2.value2 = i

            pixel2.addEventListener("mouseover", draw) 
            pixel2.addEventListener("mousedown", draw)
            container.append(pixel2)
        }

        let isClicked = false;
        container.addEventListener("mousedown", () => {
            isClicked = true;
        })
        container.addEventListener("mouseup", () => {
            isClicked = false;
        })
    
    function draw(e) { 
        if(e.type === "mousedown" && colorMode && brush2on === false || colorMode && isClicked && brush2on === false && e.type ==="mouseover") {
            e.target.style.backgroundColor = `${colorPixel}`
        } 
        else if (e.type === "mousedown" && colorMode && brush2on || (colorMode && isClicked && brush2on && e.type === "mouseover")) {
            const pixels = document.getElementsByClassName("pixel")
            e.target.style.backgroundColor = `${colorPixel}`

            let right = e.target.nextElementSibling
            let left = e.target.previousElementSibling
            let up = pixels[((e.target.value1) - 1) - parseInt(column)]
            let down = pixels[((e.target.value1) - 1) + parseInt(column)]

            function drawExtend(angle) {
                angle.style.backgroundColor = `${colorPixel}`
            }

            while (e.target.value2 > row) {
                e.target.value2 -= row
            }
            
            // limit left and right edges
            if (e.target.value2 == 1) {
                drawExtend(right)
            } else if (e.target.value2 == row) {
                drawExtend(left)
            } else {
                drawExtend(right)
                drawExtend(left)
            }

            // limit top and bottom edges              
            if (e.target.value1 <= row) {
                drawExtend(down)
            } else if (e.target.value1 > (row * row) - row) {
                drawExtend(up)
            } else {
                drawExtend(up)
                drawExtend(down)
            }
        }
    }
    
    const selection = document.getElementsByClassName("pixel")

    if (gridsOn === false) {
        const pixels = document.getElementsByClassName("pixel")
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].classList.add("pixelOutline")
        }
    } else if (gridsOn === true) {
        const pixels = document.getElementsByClassName("pixel")
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].classList.remove("pixelOutline")
        }
    }
}

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
    colorBtn.classList.add("btnSelected")
    rainbowBtn.classList.remove("btnSelected")
    eraser.classList.remove("btnSelected")
    colorPixel = colorPicker.value
}