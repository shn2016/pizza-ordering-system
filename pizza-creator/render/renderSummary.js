function renderSummary(state) {
    const { selectedToppings } = state;
    const parentNode = document.querySelector('ul.summary');
    clearNode(parentNode);

    if (typeof selectedToppings === 'undefined' || selectedToppings.length == 0) {
      return;
    }

    const li = document.createElement('li');
    const piizaSpan = document.createElement('span');
    piizaSpan.innerHTML = "Pizza"
    const simpleSpan1 = document.createElement('span');
    const simpleSpan2 = document.createElement("span");
    const simpleSpan3 = document.createElement("span");
    const priceSpan = document.createElement("span");
    priceSpan.innerHTML = "$9.99";
    li.append (piizaSpan, simpleSpan1, simpleSpan2, simpleSpan3, priceSpan);
    parentNode.append(li);


    selectedToppings.forEach(selectedTopping => {
      const { name, amount, price } = selectedTopping;

      const li = document.createElement('li');

      const addButton = document.createElement('button');
      addButton.classList.add('amount');
      addButton.innerText = '+';
      addButton.onclick = () => {
        onAddToppingClick(selectedTopping, state);
      }

      const minusButton = document.createElement('button');
      minusButton.classList.add('amount');
      minusButton.innerText = '-';
      minusButton.onclick = () => {
        onMinusToppingClick(selectedTopping, state);
      }

      const nameSpan = document.createElement('span');
      nameSpan.innerText = name;

      const amountSpan = document.createElement('span');
      amountSpan.innerText = `* ${amount}`;

      const priceSpan = document.createElement('span');
      let amountPrice = parseFloat(price) * parseFloat(amount);
      amountPrice = amountPrice.toFixed(2);
      priceSpan.innerText = `$ ${amountPrice}`;

      li.append(addButton, minusButton, nameSpan, amountSpan, priceSpan);
      parentNode.append(li);
    });
  }