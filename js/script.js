/*
 * Joshua Pendlebury
 * Assignment 2 - COMP1073
 * 2025-07-14
 */
//Learned of Javadoc param due to VS Code's auto complete

const flavourPriceDisplay = document.getElementById("flavour-price");
const flavourSelect = document.getElementById("flavour-select");

const sizePriceDisplay = document.getElementById("size-price");
const sizeSelect = document.getElementById("size-selector");

const orderForm = document.getElementById("order-form");
const orderSubmit = document.getElementById("order-submit");

const receiptOutput = document.getElementById("output");

let flavourMenu = {"Strawberry": 0.19 , "Orange": 0.29, "Banana": 0.19, "Raspberry": 0.49};
let sizeMenu = {"Small": 2.49, "Medium": 2.99, "Large": 3.49};

let flavourClass = "flavor-options";

class Smoothie{
    //Attributes
    customer;
    flavour;
    size;

    //Constructor
    /**
     * 
     * @param {string} customer - The customer's name
     * @param {Array} flavours 
     * @param {string} size
     */
    constructor(customer, flavours, size){
        this.customer = customer;
        this.flavours = flavours;
        this.size = size;
        console.log(`${this.customer}, [${this.flavours}], ${this.size}`)
    }

    /**
     * 
     * @param {Array} flavours 
     * @returns {HTMLElement} The smoothie receipt to be placed in the HTML
     */
    serveOrder(){
        let receipt = document.createElement("div");
        let receiptTitle = document.createElement("h4");
        let receiptSmoothieSize = document.createElement("p");
        let receiptSmoothieSizePrice = document.createElement("p");
        let receiptFlavoursList = document.createElement("ul");
        let receiptFlavoursPriceList = document.createElement("ul");
        let receiptTotalTitle = document.createElement("p");
        let receiptTotalPrice = document.createElement("p");

        let totalPrice = sizeMenu[this.size];

        receipt.classList.add("receipt-container");

        receiptTitle.textContent = `${capitalizeFirstOnly(this.name)}'s Order`;
        receiptTitle.classList.add("receipt-title");

        receiptSmoothieSize.textContent = `${capitalizeFirstOnly(this.size)} Smoothie`;
        receiptSmoothieSize.classList.add("receipt-size");

        receiptSmoothieSizePrice.textContent = `$${sizeMenu[this.size].toFixed(2)}`;
        receiptSmoothieSizePrice.classList.add("receipt-size-price");

        receiptFlavoursList.classList.add("receipt-flavours");
        receiptFlavoursPriceList.classList.add("receipt-flavours-price")


        for(let flavour of this.flavours){
            let flavourLI = document.createElement("li");
            let flavourPrice = document.createElement("li");

            flavourLI.textContent = flavour;
            flavourPrice.textContent = `+$${flavourMenu[flavour].toFixed(2)}`;

            receiptFlavoursList.appendChild(flavourLI);
            receiptFlavoursPriceList.appendChild(flavourPrice);

            totalPrice += flavourMenu[flavour];
        }

        receiptTotalTitle.textContent = "Total:";
        receiptTotalTitle.classList.add("receipt-total-title");
        receiptTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        receiptTotalPrice.classList.add("receipt-total-price");

        
        receipt.appendChild(receiptTitle);
        receipt.appendChild(receiptSmoothieSize);
        receipt.appendChild(receiptSmoothieSizePrice);

        receipt.appendChild(receiptFlavoursList);
        receipt.appendChild(receiptFlavoursPriceList);

        receipt.appendChild(receiptTotalTitle);
        receipt.appendChild(receiptTotalPrice);

        return receipt;
    }
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
        let newCheckContainer = document.createElement("div");

        newCheckBox.id = key;
        newCheckBox.name = name? name : key;
        newCheckBox.type = isRadio? "radio" : "checkbox";
        if(classHTML){
            newCheckBox.classList.add(classHTML);
        }

        newCheckLabel.setAttribute("for", key);
        newCheckLabel.textContent = `${capitalizeFirstOnly(key)} $${Number(menu[key]).toFixed(2)}`;
        newCheckContainer.appendChild(newCheckBox);
        newCheckContainer.appendChild(newCheckLabel);
        containerElem.appendChild(newCheckContainer);
    }
}

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

//Populating the size dropdown menu with the sizeMenu keys
for(let size of Object.keys(sizeMenu)){
    addSelOption(sizeSelect, size);
}

selectorDisplayPrice(sizeSelect, sizePriceDisplay, sizeMenu)

//flavourSelect.addEventListener("change", () => selectorDisplayPrice(flavourSelect, flavourPriceDisplay, flavourMenu));
sizeSelect.addEventListener("change", () => selectorDisplayPrice(sizeSelect, sizePriceDisplay, sizeMenu));

//document.getElementsByClassName(flavourClass).addEventListener("click")

orderSubmit.addEventListener("click", (e) => {

    let customerName;
    let smoothieSize;
    let flavourList = [];
    let validInput = true;

    const orderData = new FormData(orderForm, orderSubmit);
    for (const [key, value] of orderData) {
        //console.log(`${key}: ${value}\n`);

        if(key === "customer-name"){
            if(!value){
                alert("You must input a name.")
                validInput = false;
            }
            customerName = String(value);
        }
        else if(key === "size-selector"){
            smoothieSize = String(value);
        }
        else{
            flavourList.push(key);
        }
    }
    e.preventDefault();

    if(flavourList.length < 1){
        alert("You must select at least 1 flavour.");
        validInput = false;
    }
    if(validInput){
        let completeOrder = new Smoothie(customerName, flavourList, smoothieSize);
        receiptOutput.append(completeOrder.serveOrder());
    }
})