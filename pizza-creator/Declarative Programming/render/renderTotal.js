import clearNode from "../helper/clearNode";
import getTotal from "../helper/getTotal";

export default function renderTotal(state){
    let totalPrice = 0;

    const total = document.querySelector('.total');

    // if (typeof selectedToppings === 'undefined' || selectedToppings.length == 0) {
    //   total.innerHTML = "Total: $0";
    //   return;
    // }
    totalPrice = getTotal(state);
    total.innerText=`Total:$${totalPrice}`;

  }