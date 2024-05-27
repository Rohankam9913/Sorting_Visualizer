const main = document.querySelector(".main");
const nav = document.querySelector(".nav");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const select = document.getElementById("speed");
let speedValue = 300;

select.addEventListener("click",(e)=>{
    if(e.target.value === "Medium"){
        speedValue = 200;
    }
    else if(e.target.value === "Fast"){
        speedValue = 100;
    }
    else{
        speedValue = 300;
    }
})

const generateRandomArray = (size) => {
    let set = new Set, arr;
    for (let i = 0; i < size; i++) {
        set.add(Math.floor(Math.random() * 100 + 10));
    }

    arr = [...set];
    return arr;
}

const generateArray = () => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    button1.disabled = true;
    button1.style.backgroundColor = "lightgrey";

    let randomValues = generateRandomArray(20);
    for (let i = 0; i < randomValues.length; i++) {
        const bars = document.createElement("div");
        bars.style.height = `${randomValues[i] * 3}px`;
        bars.classList.add("bars");

        const barLabel = document.createElement("label");
        barLabel.innerHTML = randomValues[i];
        barLabel.classList.add("barLabel");

        bars.appendChild(barLabel);
        main.appendChild(bars);
    }
}

const bubbleSort = async () => {
    if(!main.hasChildNodes()){
        const error = document.createElement("p");
        error.innerHTML = "Please Provide the array for sorting";
        error.classList.add("error");
        main.appendChild(error);
        return;
    }

    let reset = document.createElement("button");
    nav.appendChild(reset);
    reset.innerHTML = "Reset";
    reset.classList.add("reset");
    reset.addEventListener("click",()=>{
        window.location.reload();
    })

    button2.disabled = true;
    button2.style.backgroundColor = "lightgrey";

    const bars = document.querySelectorAll(".bars");
    for(let i = 0;i < bars.length;i++){
        for(let j = 0;j < bars.length-i-1;j++){
            let val1 = parseInt(bars[j].firstChild.textContent);
            let val2 = parseInt(bars[j+1].firstChild.textContent);

            bars[j].style.backgroundColor = "tomato";
            bars[j+1].style.backgroundColor = "tomato";

            await new Promise((resolve)=>setTimeout(resolve,speedValue));

            if(val1 > val2){
                let temp = bars[j+1].firstChild.textContent;
                bars[j+1].firstChild.textContent = bars[j].firstChild.textContent;
                bars[j].firstChild.textContent = temp;
                bars[j].style.height = `${val2*3}px`;
                bars[j+1].style.height = `${val1*3}px`;

            }

            bars[j].style.backgroundColor = "rgb(65, 108, 122)";
            bars[j+1].style.backgroundColor = "rgb(65, 108, 122)";
        }
        bars[bars.length-i-1].style.backgroundColor = "rgb(101, 197, 101)";
    }

    button1.disabled = false;
    button1.style.backgroundColor = "purple";

    button2.disabled = false;
    button2.style.backgroundColor = "purple";
}