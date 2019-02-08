import clearNode from "../helper/clearNode";
import getTotal from "../helper/getTotal";

export default function renderConfirmationModal({ 
  isDisplayConfirmationModal, 
  selectedSize,
  selectedToppings, 
  customer, 
  info,
  validatingInputRequirement,
  onCancelButtonClick 
}) {
    const rootElement = document.createElement('div');
    rootElement.classList.add('confirmation-modal')

    if (!isDisplayConfirmationModal) {
      return rootElement;
    }
    if(validatingInputRequirement(selectedSize, info)){
      return rootElement;
    };

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');

    const modalBoxDiv = document.createElement('div');
    modalBoxDiv.classList.add('modal-box');

    modalDiv.append(modalBoxDiv);

    const h1 = document.createElement('h1');
    h1.innerText = 'Your Order Details';

    const addressDiv = document.createElement('address');
    
    const nameP = document.createElement('p');
    const nameStrong = document.createElement('strong');
    nameStrong.innerText = customer.name;
    nameP.append(nameStrong);

    const streetP = document.createElement('p');
    streetP.innerText = customer.address;

    const cityP = document.createElement('p');
    cityP.innerText = `VIC ${customer.postcode}`;

    const numberP = document.createElement('p');
    numberP.innerText = customer['contact number'];    

    addressDiv.append(nameP, streetP, cityP, numberP);

    const hr = document.createElement('hr');

    const pizzasDiv = document.createElement('div');
    pizzasDiv.classList.add('pizzas');

    const pizzaDiv = document.createElement('div');
    pizzaDiv.classList.add('pizza');

    const itemDiv = document.createElement('div');
    
    const itemStrong = document.createElement('strong');
    itemStrong.innerText = `${selectedSize.name} Pizza`;

    const itemBr = document.createElement('br');
    const itemSpan = document.createElement('span');
    let toppingSummary = '';
    selectedToppings.forEach(selectedTopping => {
        const {name, amount} = selectedTopping;
        toppingSummary += ` ${name.charAt(0).toUpperCase()+name.slice(1)} * ${amount} `;
    });
    itemSpan.innerText = toppingSummary;

    itemDiv.append(itemStrong, itemBr, itemSpan);

    const priceDiv = document.createElement('div');
    const totalPrice = getTotal({ selectedToppings, selectedSize });
    priceDiv.innerText = `$${totalPrice}`;

    pizzaDiv.append(itemDiv, priceDiv);

    pizzasDiv.append(pizzaDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.innerText = 'Cancel';
    cancelButton.onclick = () => {
      onCancelButtonClick();
    };

    const confirmButton = document.createElement('button');
    confirmButton.classList.add('confirm');
    confirmButton.innerText = 'Confirm';

    actionsDiv.append(cancelButton, confirmButton);

    modalBoxDiv.append(h1, addressDiv, hr, pizzasDiv, actionsDiv);

    rootElement.append(modalDiv);
    return rootElement;
  } 


