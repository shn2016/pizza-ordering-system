export default function renderToppings(props) {
    const {toppings, selectedToppings, onToppingClick } = props;
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

  

  