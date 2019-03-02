import React from 'react';
import getTotal from "../helper/getTotal";

const Total = ({ selectedToppings, selectedSize }) => {
  let totalPrice = 0;
  totalPrice = getTotal({ selectedToppings, selectedSize });
  return (
    <div className = 'total'>
      Total:${totalPrice}
    </div>
  )
}

export default Total;
