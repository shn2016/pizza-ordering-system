import React from 'react';
import ReactDOM from 'react-dom';

export default function Toppings({
  toppings, 
  selectedToppings, 
  onToppingClick 
}) {    
    const toppingDivs = toppings.map(topping => {
      const { name: toppingName } = topping;

      const toppingImg = React.createElement('img',{
        alt:toppingName,
        src: `https://toddmotto.com/angular-pizza-creator/assets/toppings/${toppingName}.svg`,
      });
      const toppingImgContainer = React.createElement('div',{
        className: 'img',
      }, toppingImg);

      const nameSpan = React.createElement('span',null,toppingName);

      const toppingDiv = React.createElement('div',{
        className: `topping ${selectedToppings.find(({ name }) => name === topping.name) ? 'active' : null}`,
        onClick: () => onToppingClick(topping),
      },[toppingImgContainer, nameSpan]);

      return toppingDiv;
    });

    const rootElement = React.cloneElement('div',{
      className: 'toppings',
    });
    return rootElement;

  }

  

  