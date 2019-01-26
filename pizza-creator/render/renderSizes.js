function renderSizes(state) {
    const { pizzaSizes } = state;
    let {selectedSize} = state;
    const parentNode = document.querySelector('.pizza-size');
    clearNode(parentNode);

    pizzaSizes.forEach(pizzaSize => {
      const { name, size } = pizzaSize;
      const imageContainer = document.createElement('div');

      if (selectedSize && name === selectedSize.name) {
        imageContainer.classList.add('active');
      };

      imageContainer.onclick = function() {
        state.selectedSize = pizzaSize;
        render(state);
      };

      imageContainer.classList.add('img');
      imageContainer.classList.add(name);

      const pizzaImg = document.createElement('img');
      pizzaImg.alt = name;
      pizzaImg.src = './pizza.svg';
      pizzaImg.classList.add('pizzaImg');
      const nameSpan = document.createElement('span');
      nameSpan.innerText = `${name}  (${size}')`;
      
      imageContainer.append(pizzaImg, nameSpan);

      parentNode.append(imageContainer);
    }
    )

  }
