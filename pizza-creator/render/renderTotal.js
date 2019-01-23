function renderTotal(state){
    let totalPrice = 0;

    const { selectedToppings } = state;
    const total = document.querySelector('.total');

    if (typeof selectedToppings === 'undefined' || selectedToppings.length == 0) {
      total.innerHTML = "Total: $0";
      return;
    }
    selectedToppings.forEach( ({price, amount}) => { 
      totalPrice += amount * price;
    // totalPrice +=  parseFloat(amount) * parseFloat(price);
    });

    // totalPrice = parseFloat(totalPrice) + 9.99;
    totalPrice = totalPrice + 9.99;
    totalPrice = totalPrice.toFixed(2);
    total.innerText=`Total:$${totalPrice}`;

  }