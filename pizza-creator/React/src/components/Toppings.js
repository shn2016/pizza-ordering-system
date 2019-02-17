import React from 'react';

export default function Toppings({
  toppings, 
  selectedToppings, 
  onToppingClick 
}) {    
    const toppingDivs = toppings.map(topping => {
      const { name: toppingName } = topping;

      const toppingImg = React.createElement('img',{
        src: `https://toddmotto.com/angular-pizza-creator/assets/toppings/${toppingName}.svg`,
      });
      const toppingImgContainer = React.createElement('div',{
        className: 'img',
        key:'toppingImgContainer'
      }, toppingImg);

      const nameSpan = React.createElement('span',{   
        key:'nameSpan',
      },toppingName);

      const toppingDiv = React.createElement('div',{
        className: `topping ${selectedToppings.find(({ name }) => name === topping.name) ? 'active' : null}`,
        onClick: () => onToppingClick(topping),
        key: toppingName,
      },[toppingImgContainer, nameSpan]);

      return toppingDiv;
    });

    const rootElement = React.createElement('div',{
      className: 'toppings',
    }, toppingDivs );

    return rootElement;
  }

  

  