import pizza from '../images/pizza.svg';

export default function renderSizes(state) {
    const { pizzaSizes } = state;
    let {selectedSize} = state;
    
    const rootElement = document.createElement('div');
    rootElement.classList.add('pizza-size');

    pizzaSizes.forEach(pizzaSize => {
      const { name, size } = pizzaSize;
      const imageContainer = document.createElement('div');

      if (selectedSize && name === selectedSize.name) {
        imageContainer.classList.add('active');
      };

      imageContainer.onclick = function() {
        state.selectedSize = pizzaSize;
      };

      imageContainer.classList.add('img');
      imageContainer.classList.add(name);

      const pizzaImg = document.createElement('img');
      pizzaImg.alt = name;
      pizzaImg.src = pizza;
      pizzaImg.classList.add('pizzaImg');
      const nameSpan = document.createElement('span');
      nameSpan.innerText = `${name}  (${size}')`;
      
      imageContainer.append(pizzaImg, nameSpan);

      rootElement.append(imageContainer);
    }
    )
    return rootElement;
  }
