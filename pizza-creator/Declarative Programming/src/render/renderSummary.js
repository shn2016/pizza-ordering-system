
export default function renderSummary({
  selectedToppings, 
  selectedSize,
  onAddToppingClick,
  onMinusToppingClick,
}) {
    const rootElement = document.createElement('ul');
    rootElement.classList.add('summary');

    if(selectedSize !== null){
      const { name, price} =  selectedSize;
      const li = document.createElement('li');
      const piizaSpan = document.createElement('span');
      piizaSpan.innerHTML = `${name} Pizza`;
      const simpleSpan1 = document.createElement('span');
      const simpleSpan2 = document.createElement("span");
      const simpleSpan3 = document.createElement("span");
      const priceSpan = document.createElement("span");
      priceSpan.innerHTML = `$${price}`;
      li.append (simpleSpan1, simpleSpan2, piizaSpan, simpleSpan3, priceSpan);
      rootElement.append(li);
    }

    selectedToppings.forEach(selectedTopping => {
      const { name, amount, price } = selectedTopping;

      const li = document.createElement('li');

      const addButton = document.createElement('button');
      addButton.classList.add('amount');
      addButton.innerText = '+';
      addButton.onclick = () => {
        onAddToppingClick(selectedTopping);
      }

      const minusButton = document.createElement('button');
      minusButton.classList.add('amount');
      minusButton.innerText = '-';
      minusButton.onclick = () => {
        onMinusToppingClick(selectedTopping);
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
      rootElement.append(li);
    });

    return rootElement;
  }