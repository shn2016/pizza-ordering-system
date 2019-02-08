import getTotal from "../helper/getTotal";

export default function renderTotal({ selectedToppings, selectedSize }){

  const rootElement = document.createElement('div');
  rootElement.classList.add('total');
  
  let totalPrice = 0;

  totalPrice = getTotal({ selectedToppings, selectedSize });
  rootElement.innerText=`Total:$${totalPrice}`;
  return rootElement;
}