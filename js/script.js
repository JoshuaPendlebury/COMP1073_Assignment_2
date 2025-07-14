
//Learned of Javadoc param due to VS Code's auto complete

const flavourPriceDisplay = document.getElementById("flavour-price");
const flavourSelect = document.getElementById("flavour-select");

const sizePriceDisplay = document.getElementById("size-price");
const sizeSelect = document.getElementById("size-selector");

let flavourMenu = {"Strawberry": 0.19 , "Orange": 0.29, "Banana": 0.19, "Raspberry": 0.49};
let sizeMenu = {"Small": 2.49, "Medium": 2.99, "Large": 3.49};

let flavourClass = "flavor-options";

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

/**
 * Creates new option elements for select elements using a string for the display text and the value
 * 
 * @param {HTMLElement} selectorElem 
 * @param {string} newOption 
 */
function addSelOption(selectorElem, newOption){
    let newOptionHTML = document.createElement("option");
    newOptionHTML.textContent = capitalizeFirstOnly(newOption);
    newOptionHTML.value = newOption;

    selectorElem.appendChild(newOptionHTML);
}

/**
 * Updates an HTML text element with the current price of the selected object
 * 
 * @param {HTMLElement} input - A HTML selector to take its current value
 * @param {HTMLElement} output - A text HTML element to output the price to
 * @param {object} menu - An object that contains key value pairs of a String item name and a Number price e.g. "Strawberry": 0.19
 */
function selectorDisplayPrice(input, output, menu){
    output.textContent = `$${String(menu[input.value])}`;
}

/**
 * Fills an empty container element with checkboxes or radio buttons using a menu object
 * 
 * @param {HTMLElement} containerElem - A HTML element that will contain the generated checkboxes/radio buttons
 * @param {object} menu - An object that contains key value pairs of a String item name and a Number price e.g. "Strawberry": 0.19
 * @param {string} classHTML - Optional: adds a class value to the new HTML element
 * @param {string} name - Optional: manually sets a name value for all the checkboxes generated
 * @param {boolean} isRadio - Optional: Makes the function generate radio buttons instead (Requires name parameter)
 */
function addCheckBoxMenu(containerElem, menu, classHTML, name, isRadio){
    for(let key of Object.keys(menu)){
        let newCheckBox = document.createElement("input");
        let newCheckLabel = document.createElement("label");

        newCheckBox.id = key;
        newCheckBox.name = name? name : key;
        newCheckBox.type = isRadio? "radio" : "checkbox";
        if(classHTML){
            newCheckBox.classList.add(classHTML);
        }

        newCheckLabel.setAttribute("for", key);
        newCheckLabel.textContent = `${capitalizeFirstOnly(key)} $${Number(menu[key]).toFixed(2)}`;
        containerElem.appendChild(newCheckBox);
        containerElem.appendChild(newCheckLabel);
    }
}

function checkboxPriceDisplay(checkboxContainer, output){}

/**
 * Function to capitalize the first letter of the string and lowercase the rest. Example: "hElLo wORLD!" to "Hello world!"
 * 
 * @param {string} string 
 * @returns {string}
 */
function capitalizeFirstOnly(string){
    return String(string).charAt(0).toUpperCase() + String(string).slice(1).toLowerCase();
}

//Populating the flavour dropdown menu with the flavourMenu keys
addCheckBoxMenu(flavourSelect, flavourMenu, flavourClass);


selectorDisplayPrice(flavourSelect, flavourPriceDisplay, flavourMenu)

//Populating the size dropdown menu with the sizeMenu keys
for(let size of Object.keys(sizeMenu)){
    addSelOption(sizeSelect, size);
}

selectorDisplayPrice(sizeSelect, sizePriceDisplay, sizeMenu)

//flavourSelect.addEventListener("change", () => selectorDisplayPrice(flavourSelect, flavourPriceDisplay, flavourMenu));
sizeSelect.addEventListener("change", () => selectorDisplayPrice(sizeSelect, sizePriceDisplay, sizeMenu));

document.getElementsByClassName(flavourClass).addEventListener("click")