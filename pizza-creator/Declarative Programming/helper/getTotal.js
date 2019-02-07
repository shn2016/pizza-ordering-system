export default function getTotal(state){
    let totalPrice = 0;
    const { selectedToppings, selectedSize } = state;

    selectedToppings.forEach( ({price, amount}) => { 
        totalPrice += amount * price;
      });
      if(selectedSize !==null ) {
        totalPrice = parseFloat(totalPrice) + parseFloat(selectedSize.price);
      }
      totalPrice = parseFloat(totalPrice).toFixed(2);

      return totalPrice;
}