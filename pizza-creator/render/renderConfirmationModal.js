function renderConfirmationModal(state) {
    const { isDisplayConfirmationModal, selectedSize,selectedToppings } = state;

    const parentNode = document.querySelector('.confirmation-modal');
    clearNode(parentNode);

    if (!isDisplayConfirmationModal) {
      return;
    }

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
    nameStrong.innerText = 'Long Zhao';
    nameP.append(nameStrong);

    const streetP = document.createElement('p');
    streetP.innerText = '6456 Heloise Inlet';

    const cityP = document.createElement('p');
    cityP.innerText = 'Melbourne 3000';

    const numberP = document.createElement('p');
    numberP.innerText = '0416413665';

    addressDiv.append(nameP, streetP, cityP, numberP);

    const hr = document.createElement('hr');

    const pizzasDiv = document.createElement('div');
    pizzasDiv.classList.add('pizzas');

    const pizzaDiv = document.createElement('div');
    pizzaDiv.classList.add('pizza');

    const itemDiv = document.createElement('div');
    
    const itemStrong = document.createElement('strong');
    itemStrong.innerText = selectedSize.name;

    const itemBr = document.createElement('br');
    const itemSpan = document.createElement('span');
    let toppingSummary = '';
    selectedToppings.forEach(selectedTopping => {
        const {name, amount} = selectedTopping;
        toppingSummary += `${name} * ${amount}`;
    });
    itemSpan.innerText = toppingSummary;

    itemDiv.append(itemStrong, itemBr, itemSpan);

    const priceDiv = document.createElement('div');
    priceDiv.innerText = '$10.99';

    pizzaDiv.append(itemDiv, priceDiv);

    pizzasDiv.append(pizzaDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.innerText = 'Cancel';
    cancelButton.onclick = () => {
      state.isDisplayConfirmationModal = false;
      render(state);
    };

    const confirmButton = document.createElement('button');
    confirmButton.classList.add('confirm');
    confirmButton.innerText = 'Confirm';

    actionsDiv.append(cancelButton, confirmButton);

    modalBoxDiv.append(h1, addressDiv, hr, pizzasDiv, actionsDiv);

    parentNode.append(modalDiv);
  } 
