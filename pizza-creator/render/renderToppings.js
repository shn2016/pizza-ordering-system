function renderToppings(state) {
    const { toppings, selectedToppings } = state;
    const parentNode = document.querySelector('.toppings');
    clearNode(parentNode);

    toppings.forEach(topping => {
      const { name: toppingName } = topping;
      const container = document.createElement('div');
      container.classList.add('topping');

      if (selectedToppings.find(({ name }) => name === topping.name)) {
        container.classList.add('active');
      }

      container.onclick = function() {
        onToppingClick(topping, state);
      };

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('img');

      const image = document.createElement('img');
      image.alt = toppingName;
      image.src = `https://toddmotto.com/angular-pizza-creator/assets/toppings/${toppingName}.svg`;

      const name = document.createElement('span');
      name.innerText = toppingName;
      
      imageContainer.append(image);
      container.append(imageContainer, name);

      parentNode.append(container);
    });
  }

  function onMinusToppingClick(topping, state) {
    const { selectedToppings } = state;

    const newSelectedToppings = selectedToppings.map(selectedTopping => {
      const { name } = selectedTopping;

      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount - 1;

        if (newAmount === 0) {
          return undefined;
        }

        return {
          ...topping,
          amount: newAmount,
        }
      }

      return selectedTopping;
    });

    state.selectedToppings = newSelectedToppings.filter(newSelectedTopping => !!newSelectedTopping);
    render(state);
  }

  function onAddToppingClick(topping, state) {
    const { selectedToppings } = state;

    const newSelectedToppings = selectedToppings.map(selectedTopping => {
      const { name } = selectedTopping;

      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount + 1;

        return {
          ...topping,
          amount: newAmount,
        }
      }

      return selectedTopping;
    });

    state.selectedToppings = newSelectedToppings;
    render(state);
  }

  function onToppingClick(topping, state) {
    const { selectedToppings, selectedSize, pizzaSizes } = state;
    const isExists = state.selectedToppings.find(({ name }) => name === topping.name);

    const newSelectedToppings = !isExists 
      ? [{ ...topping, amount: 1 }, ...selectedToppings] 
      : selectedToppings.filter(({ name }) => name !== topping.name);

    state.selectedToppings = newSelectedToppings;
    
    if( selectedSize === null ){
      state.selectedSize = pizzaSizes[2];
    }
    render(state);
  }