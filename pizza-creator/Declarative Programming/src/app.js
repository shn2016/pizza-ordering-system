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
import renderButton from "./render/renderButton";

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
    this.onFormChange = this.onFormChange.bind(this); 
    this.onPizzaSizeSelected = this.onPizzaSizeSelected.bind(this); 
    this.validatingInputRequirement = this.validatingInputRequirement.bind(this); 
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this); 
    this.onResetButtonClick = this.onResetButtonClick.bind(this); 
    this.onPlaceButtonClick = this.onPlaceButtonClick.bind(this); 

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

   onFormChange(column, input){
    const { info } = this.state;
    const newInfo = info.map(singleInfo => {
        const {column: newColumn} = singleInfo;

        if( newColumn === column && column === 'confirm email' 
        && this.state.customer['email'] !==input.value){
            alert('Please fill the previous box first or make sure they are matched');
            return {
                column,
                value: null,
            };
        }
        if (newColumn === column){
            const newValue = input.value;
            return {
                column, 
                value: newValue,
            }
        }        
        return singleInfo;
    })
    this.state.info = newInfo;

    if (column !=='confirm email'){
      this.state.customer[column] = input.value;
    }
}
  
  onPizzaSizeSelected(pizzaSize){
    this.state.selectedSize = pizzaSize;
    this.render(this.state);
  }

  validatingInputRequirement(selectedSize, info){
    let isAlert = false;
    let message = 'Warning: Please fill up the follow input box: ';

    info.forEach( ({column, value}) => {
      if(value === null){
        message += `\n ${column} `;
        isAlert = true;
      }
    });

    if(isAlert){
      alert(message);
      this.state.isDisplayConfirmationModal = false;
    }
    
    if (selectedSize === null) {
      isAlert = true;
      alert('Please select a pizza.');
      this.state.isDisplayConfirmationModal = false;
    }

    return isAlert;
  };

  onCancelButtonClick(){
    this.state.isDisplayConfirmationModal = false;
    this.render(this.state);
  };

  onResetButtonClick(){
    this.state.selectedToppings = [];
      // state.customer = { name: '', email :'', address:'', postcode:'',mobile:'' };
      Object.keys(this.state.customer).forEach( thing => {
        this.state.customer[thing]=null;
      });

      const newInfo = info.map(element =>{
        const {column} = element;
        return {column, value:null};
      })
      this.state.info = newInfo;
      this.state.selectedSize = null;
      this.render(this.state);
  }

  onPlaceButtonClick(){
    this.state.isDisplayConfirmationModal = true;
    this.render(this.state);
  }

  render(){
    const rootElement = document.querySelector('#app');
    clearNode(rootElement);

    const confirmationModalContainer = renderConfirmationModal({
      ...this.state, 
      validatingInputRequirement: this.validatingInputRequirement,
      onCancelButtonClick: this.onCancelButtonClick,
    });
    
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('section');
    const detailsH2 = document.createElement('h2');
    detailsH2.innerHTML = 'Enter Your Details';
    const detailsRoot = renderForm({...this.state, onFormChange : this.onFormChange});
    detailsContainer.append(detailsH2,detailsRoot);

    const pizzaContainer = document.createElement('div');
    pizzaContainer.classList.add('section');
    const pizzaH2 = document.createElement('h2');
    pizzaH2.innerHTML = 'Pick Your Pizza';
    const pizzaRoot = renderSizes({...this.state, onPizzaSizeSelected: this.onPizzaSizeSelected});
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

    const buttonContainer = renderButton({
      onPlaceButtonClick: this.onPlaceButtonClick,
      onResetButtonClick: this.onResetButtonClick,
    });


    rootElement.append(confirmationModalContainer,detailsContainer,pizzaContainer,toppingsContainer,summaryContainer,buttonContainer);

  };
}