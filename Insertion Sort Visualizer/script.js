const main = document.querySelector(".main");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const nav = document.querySelector(".nav");
const selected_element = document.getElementById("selected_element");
const speed = document.getElementById("speed");
let speedValue = 600;

speed.addEventListener("click", (e) => {
    if (e.target.value === "Medium") speedValue = 400;
    else if (e.target.value === "Fast") speedValue = 200;
    else speedValue = 300;
});

const generateRandomArray = (size) => {
    let set = new Set, ans;
    for (let i = 0; i < size; i++) {
        set.add(Math.floor(Math.random() * 100 + 10));
    }
    ans = [...set];
    return ans;
}

const generateNewArray = () => {
    if (main.hasChildNodes()) {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }

    let randomValues = generateRandomArray(20);
    for (let i = 0; i < randomValues.length; i++) {
        let bars = document.createElement("div");
        bars.classList.add("bars");
        bars.style.height = `${randomValues[i] * 3}px`;

        let barLabel = document.createElement("label");
        barLabel.innerHTML = randomValues[i];
        barLabel.classList.add("barLabel");

        bars.appendChild(barLabel);
        main.appendChild(bars);
    }

    button1.disabled = true;
    button1.style.backgroundColor = "lightgrey";
}

const insertionSort = async () => {
    if (!main.hasChildNodes()) {
        const error = document.createElement("p");
        error.innerHTML = "Please provide array for insertion sort to perform";
        error.classList.add("error");
        main.appendChild(error);
        return;
    }

    const reset = document.createElement("button");
    reset.innerHTML = "Reset";
    reset.classList.add("reset");
    reset.addEventListener("click",()=>{
        setTimeout(()=>{
            window.location.reload();
        },100); 
    })
    nav.appendChild(reset);


    button2.disabled = true;
    button2.style.backgroundColor = "lightgrey";

    const bars = document.querySelectorAll(".bars");
    bars[0].style.backgroundColor = "rgb(49, 226, 13)";
    let ele, j,height;

    for (let i = 1; i < bars.length; i++){
        ele = parseInt(bars[i].firstChild.textContent);
        selected_element.innerHTML = `The selected value is ${ele}`;
        j = i-1;
        height = bars[i].style.height;

        bars[i].style.backgroundColor = "darkblue";
        await new Promise((resolve)=>setTimeout(resolve,speedValue));

        while(j >= 0 && parseInt(bars[j].firstChild.textContent) > ele){
            bars[j].style.backgroundColor = "darkblue";
            bars[j+1].style.height = bars[j].style.height;
            bars[j+1].firstChild.textContent = bars[j].firstChild.textContent;
            j--;
            await new Promise((resolve)=>setTimeout(resolve,speedValue));

            for(let k = i; k >= 0;k--){
                bars[k].style.backgroundColor = "rgb(49, 226, 13)";
            }
        }

        bars[j+1].style.height = height;
        bars[j+1].firstChild.textContent = ele;

        await new Promise((resolve)=>setTimeout(resolve,speedValue));
        bars[i].style.backgroundColor = "rgb(49, 226, 13)";

    }

    button1.style.backgroundColor = "purple";
    button1.disabled = false;

    button2.style.backgroundColor = "purple";
    button2.disabled = false;

    selected_element.innerHTML = ""
}
