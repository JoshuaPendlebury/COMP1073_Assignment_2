const flavourPriceDisplay = document.getElementById("flavour-price");
const flavourSelect = document.getElementById("flavour");
const sizePriceDisplay = document.getElementById("size-price");

let flavourMenu = {"Strawberry": 2.99 , "Orange": 2.99, "Banana": 3.99, "Raspberry": 3.49}

class Smoothie{
    //Attributes
    flavour;
    size;

    //Constructor
    constructor(flavour, size){
        this.flavour = flavour;
        this.size = size;
    }

    serveOrder(){}
}

function addFlavour(newFlavour){
    let newFlavourOption = document.createElement("option");
    newFlavourOption.textContent = capitalizeFirstOnly(newFlavour);
    newFlavourOption.value = newFlavour;

    flavourSelect.appendChild(newFlavourOption);
}

function capitalizeFirstOnly(string){
    return String(string).charAt(0).toUpperCase() + String(string).slice(1).toLowerCase();
}

//Populating the flavour dropdown menu with the flavourMenu keys
for(let flavour of Object.keys(flavourMenu)){
    addFlavour(flavour);
}