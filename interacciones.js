
const arrowsLeft = document.getElementsByClassName("arrowLeft");
const arrowsRight = document.getElementsByClassName("arrowRight");

const arrayLeftArrows = Array.from(arrowsLeft);
const arrayRightArrows = Array.from(arrowsRight);

const sendButton = document.getElementById("sendButton");

arrayLeftArrows.forEach(elemento => {
    elemento.addEventListener("click", (e) => {
        const parent = e.target.id;
        let typeCounter = parent.replace("arrowLeft","");
        const counter = document.getElementById("counter"+typeCounter);
        counter.innerHTML = parseInt(counter.innerHTML) - 1;
    })
})

arrayRightArrows.forEach(elemento => {
    elemento.addEventListener("click", (e) => {
        const parent = e.target.id;
        let typeCounter = parent.replace("arrowRight","");
        const counter = document.getElementById("counter"+typeCounter);
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
    })
})

sendButton.addEventListener("click", () => {
    const numberChickenDumplings = parseInt(document.getElementById("counterChicken").innerHTML);
    const numberMeatDumplings = parseInt(document.getElementById("counterMeat").innerHTML);
    const numberVeggiesDumplings = parseInt(document.getElementById("counterVegetables").innerHTML);

    const res = fn(numberChickenDumplings, numberMeatDumplings, numberVeggiesDumplings);
    console.log(res)
})
