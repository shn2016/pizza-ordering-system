export default function getTotal({ selectedToppings, selectedSize }){
    let totalPrice = 0;

    selectedToppings.forEach( ({price, amount}) => { 
        totalPrice += amount * price;
      });
      if(selectedSize !==null ) {
        totalPrice = parseFloat(totalPrice) + parseFloat(selectedSize.price);
      }
      totalPrice = parseFloat(totalPrice).toFixed(2);

      return totalPrice;
}