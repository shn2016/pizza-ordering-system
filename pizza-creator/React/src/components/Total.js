import React from 'react';
import getTotal from "../helper/getTotal";

export default function Total({ selectedToppings, selectedSize }){
  let totalPrice = 0;
  totalPrice = getTotal({ selectedToppings, selectedSize });
  return (
    <div className = 'total'>
      Total:${totalPrice}
    </div>
  )
}