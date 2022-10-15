const container = document.querySelector(".container")
const pixels = document.querySelector(".pixel")
//pixels.innerHTML = '<div class="pixel"> WWW </div>'





    
    for(let j=1; j<=16; j++){
        for(let i=1; i<=16; i++){
            const pixel2 = document.createElement("div")
            pixel2.classList.add("pixel")
            container.append(pixel2)             
    }
}




