import getTotal from "../helper/getTotal";

export default function renderTotal(state){

  const rootElement = document.createElement('div');
  rootElement.classList.add('total');
  
  let totalPrice = 0;

  // if (typeof selectedToppings === 'undefined' || selectedToppings.length == 0) {
  //   total.innerHTML = "Total: $0";
  //   return;
  // }
  totalPrice = getTotal(state);
  rootElement.innerText=`Total:$${totalPrice}`;
  return rootElement;
}