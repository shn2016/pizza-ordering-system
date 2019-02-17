import React from 'react';
import pizza from '../images/pizza.svg';

export default function Sizes({ 
  pizzaSizes, 
  selectedSize, 
  onPizzaSizeSelected
}) {

    const imageContainers = pizzaSizes.map(pizzaSize => {
      const { name, size } = pizzaSize;

      const pizzaImg = React.createElement('img',{
        alt: name,
        src: pizza,
        className:'pizzaImg',
        key:'pizzeImg',
      });
     
      const nameSpan = React.createElement('span',{
        key:'nameSpan'
      },`${name}  (${size}')`
      );
      
      const imageContainer = React.createElement('div',{
        className:`img ${name} ${(selectedSize && name === selectedSize.name)? 'active' : null}`,
        onClick: () => onPizzaSizeSelected(pizzaSize),
        key: name,
      },[pizzaImg, nameSpan]);

      return imageContainer;
    });

    const rootElement = React.createElement('div',{
      className:'pizza-size',
    }, imageContainers);

    return rootElement;
  }
