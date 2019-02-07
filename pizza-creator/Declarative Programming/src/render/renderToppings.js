
export default function renderToppings({ toppings, selectedToppings ,onToppingClick}) {

    const rootElement = document.createElement('div');
    rootElement.classList.add('toppings');
    
    toppings.forEach(topping => {
      const { name: toppingName } = topping;
      const container = document.createElement('div');
      container.classList.add('topping');

      if (selectedToppings.find(({ name }) => name === topping.name)) {
        container.classList.add('active');
      }

      container.onclick = function() {
        onToppingClick(topping);
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

      rootElement.append(container);
    });

    return rootElement;

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

  