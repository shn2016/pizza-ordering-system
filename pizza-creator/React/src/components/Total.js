import React from 'react';
import getTotal from "../helper/getTotal";

export default function Total({ selectedToppings, selectedSize }){
  let totalPrice = 0;
  totalPrice = getTotal({ selectedToppings, selectedSize });

  const rootElement = React.createElement('div',{
    className: 'total',
    key: 'total',
  }, `Total:$${totalPrice}`)

  return rootElement;
}