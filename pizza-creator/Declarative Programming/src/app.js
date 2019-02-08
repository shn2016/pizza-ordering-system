import clearNode from "./helper/clearNode";
import renderForm from './render/renderForm';
import renderSizes from './render/renderSizes';
import renderToppings from './render/renderToppings';
import renderSummary from './render/renderSummary';
import renderConfirmationModal from './render/renderConfirmationModal';
import renderTotal from './render/renderTotal';
import info from './data/info';
import toppings from './data/toppings';
import pizzaSizes from './data/sizes';
import customer from './data/customer';

export default class App { 
  constructor(){

      this.state = {
      info,
      customer,
      pizzaSizes,
      selectedSize: null,
      toppings,
      selectedToppings: [],
      isDisplayConfirmationModal: false,
    };

    this.onToppingClick = this.onToppingClick.bind(this); 
    this.onMinusToppingClick = this.onMinusToppingClick.bind(this); 
    this.onAddToppingClick = this.onAddToppingClick.bind(this); 

    this.render();
  }; 

  onToppingClick(topping) {

    const { selectedToppings, selectedSize, pizzaSizes } = this.state;
    const isExists = this.state.selectedToppings.find(({ name }) => name === topping.name);

    const newSelectedToppings = !isExists 
      ? [{ ...topping, amount: 1 }, ...selectedToppings] 
      : selectedToppings.filter(({ name }) => name !== topping.name);

      this.state.selectedToppings = newSelectedToppings;
    
    if( selectedSize === null ){
      this.state.selectedSize = pizzaSizes[2];
    }

     this.render(this.state);
  };

   onMinusToppingClick(topping) {
    const { selectedToppings } = this.state;

    const newSelectedToppings = selectedToppings.map(selectedTopping => {
      const { name } = selectedTopping;

      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount - 1;

        if (newAmount === 0) {
          return undefined;
        }

        return {
          ...topping,
          amount: newAmount,
        }
      }

      return selectedTopping;
    });

    this.state.selectedToppings = newSelectedToppings.filter(newSelectedTopping => !!newSelectedTopping);
    this.render(this.state);
  }

   onAddToppingClick(topping) {
    const { selectedToppings } = this.state;

    const newSelectedToppings = selectedToppings.map(selectedTopping => {
      const { name } = selectedTopping;
      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount + 1;

        return {
          ...topping,
          amount: newAmount,
        }
      }
      return selectedTopping;
    });

    this.state.selectedToppings = newSelectedToppings;
    this.render(this.state);
  }

  
  render(){
    const rootElement = document.querySelector('#app');
    clearNode(rootElement);

    const confirmationModalContainer = document.createElement('div');
    confirmationModalContainer.classList.add('confirmation-modal');

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('section');
    const detailsH2 = document.createElement('h2');
    detailsH2.innerHTML = 'Enter Your Details';
    const detailsRoot = renderForm(this.state);
    detailsContainer.append(detailsH2,detailsRoot);

    const pizzaContainer = document.createElement('div');
    pizzaContainer.classList.add('section');
    const pizzaH2 = document.createElement('h2');
    pizzaH2.innerHTML = 'Pick Your Pizza';
    const pizzaRoot = renderSizes(this.state);
    pizzaContainer.append(pizzaH2,pizzaRoot);

    const toppingsContainer = document.createElement('div');
    toppingsContainer.classList.add('section');
    const toppingH2 = document.createElement('h2');
    toppingH2.innerHTML = 'Pick Your Toppings';
    const result = renderToppings({
      ...this.state,
      onToppingClick: this.onToppingClick,
    });

    toppingsContainer.append(toppingH2,result);

    const summaryContainer = document.createElement('div');    
    summaryContainer.classList.add('section');
    const summaryH2 = document.createElement('h2');
    summaryH2.innerHTML = 'Pick Your Toppings'
    const summaryUl = renderSummary({
      ...this.state,
      onAddToppingClick: this.onAddToppingClick,
      onMinusToppingClick: this.onMinusToppingClick,
    });
    const hr = document.createElement('hr');

    const totalContainer = renderTotal(this.state);
    summaryContainer.append(summaryH2,summaryUl,hr,totalContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('section');
    const placeButton =document.createElement('button');
    placeButton.type='submit';
    placeButton.innerHTML='Place Order';
    const ClearButton =document.createElement('button');
    ClearButton.type='reset';
    ClearButton.innerHTML='Clear';
    buttonContainer.append(placeButton,ClearButton);

    rootElement.append(confirmationModalContainer,detailsContainer,pizzaContainer,toppingsContainer,summaryContainer,buttonContainer);

  };
}