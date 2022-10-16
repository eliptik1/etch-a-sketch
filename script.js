const container = document.querySelector(".container")
const btn = document.querySelector("#btn")
const btn2 = document.querySelector("#btn2")
btn.addEventListener("click", removePad)



let row = 5;
let column = row;
createPad();
console.log(row)
function removePad() {
    const cont = document.querySelector(".container")
    cont.innerHTML = ""
    row = prompt("Set the grid size");
    column = row;
    createPad();
}

function createPad() {

    for (let j = 1; j <= column; j++) {
        for (let i = 1; i <= row; i++) {
            const pixel2 = document.createElement("div")
            pixel2.classList.add("pixel")
            pixel2.style.width = `${400 / row}px`
            pixel2.style.height = `${400 / row}px`
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
}