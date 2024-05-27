// Selecting the elements
const main = document.querySelector(".main");
const button1 = document.getElementById("Button1");
const button2 = document.getElementById("Button2");
const speed = document.getElementById("speed");

// setting the speed of the animation
let speedVal = 300;
speed.addEventListener("click",(e)=>{
    if(e.target.value === "medium"){
        speedVal = 200;
    }
    else if(e.target.value === "fast"){
        speedVal = 100;
    }
    else{
        speedVal = 300;
    }
})

// Function to generate random array of integers
const genrateRandomArray = () => {
    let set = new Set, arr;
    for (let i = 0; i < 20; i++) {
        set.add(Math.floor(Math.random() * 100) + 10);
    }
    arr = [...set];
    return arr;
}

// Function to generate bar on the screen
const generateNewArray = () => {
    if (main.hasChildNodes()) {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        button2.disabled = false;
        button2.style.backgroundColor = "purple";
        console.log("hello");
    }
    let randomValues = genrateRandomArray();

    for (let i = 0; i < randomValues.length; i++) {
        // creating the bar
        const bar = document.createElement("div");
        bar.style.height = `${randomValues[i] * 3}px`;
        bar.classList.add("bar");

        // creating the label for bar element
        const label = document.createElement("label");
        label.innerHTML = randomValues[i];
        label.classList.add("barLabel");

        // appending the creating elements in the container
        bar.appendChild(label);
        main.appendChild(bar);
    }

    button1.disabled = true;
    button1.style.backgroundColor = "#d8b6ff";
}

// Function to perform selection sort
const selectionSort = async () => {
    if (!main.hasChildNodes()) {
        let p = document.createElement("p");
        p.innerHTML = "Please provide the array to perform the selection sort";
        p.classList.add("error");
        main.appendChild(p);
        button2.disabled = true;
        button2.style.backgroundColor = "#d8b6ff";
        return;
    }

    button2.disabled = true;
    button2.style.backgroundColor = "#d8b6ff";
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < bars.length; i ++) {
        let min_idx = i;
        bars[i].style.backgroundColor = "darkblue";
        for (let j = i + 1; j < bars.length; j ++) {
            bars[j].style.backgroundColor = "red";
            await new Promise((resolve) => setTimeout(resolve, speedVal));

            let val1 = Number(bars[j].firstChild.textContent);
            let val2 = Number(bars[min_idx].firstChild.textContent);

            if (val1 < val2) {
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
                }
                min_idx = j;
            }
            else {
                bars[j].style.backgroundColor = "  rgb(24, 190, 255)";
            }
        }
        
        let temp1 = bars[min_idx].style.height;
        let temp2 = bars[min_idx].childNodes[0].innerText;
        bars[min_idx].style.height = bars[i].style.height;
        bars[i].style.height = temp1;
        bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = temp2;


        await new Promise((resolve) => setTimeout(resolve, speedVal));

        bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
        bars[i].style.backgroundColor = " rgb(49, 226, 13)";
    }

    button1.disabled = false;
    button1.style.backgroundColor = "#6f459e";

    button2.disabled = false;
    button2.style.backgroundColor = "#6f459e";
}
