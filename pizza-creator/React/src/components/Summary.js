import React from 'react';

export default function Summary({
  selectedToppings, 
  selectedSize,
  onAddToppingClick,
  onMinusToppingClick,
}) {
    const selectSizeLi = (selectedSize !== null)? 
    React.createElement('li',{key:'selectedSize'},[
      React.createElement('span',{key:'size'},`${selectedSize.name} Pizza`),
      React.createElement('span',{key:'1'}),
      React.createElement('span',{key:'2'}),
      React.createElement('span',{key:'3'}),
      React.createElement('span',{key:'price'},`$${selectedSize.price}`),
    ])
    : null;

    const selectedToppingLis = selectedToppings.map(selectedTopping => {
      const { name, amount, price } = selectedTopping;

      const addButton = React.createElement('button',{
        className: 'amount',
        onClick: () => onAddToppingClick(selectedTopping),
        key: 'addButton',
      }, '+');

      const minusButton = React.createElement('button',{
        className:'amount',
        onClick: () => onMinusToppingClick(selectedTopping),
        key: 'minusButton',
      }, '-');
      
      const nameSpan = React.createElement('span',{
        key: 'nameSpan'
      },name);

      const amountSpan = React.createElement('span',{
        key: 'amountSpan'
      },`* ${amount}`);
     
      let amountPrice = parseFloat(price) * parseFloat(amount);
      amountPrice = amountPrice.toFixed(2);

      const priceSpan = React.createElement('span',{
        key:'priceSpan'
      },`* ${amountPrice}`);
    
      const li = React.createElement('li',{
        key:name,
      },[addButton, minusButton,  nameSpan,  amountSpan, priceSpan
      ]);
      return li;
    });

    const rootElement = React.createElement('ul',{
      className: 'summary',
    },[ selectSizeLi, selectedToppingLis]);

    return rootElement;
  }