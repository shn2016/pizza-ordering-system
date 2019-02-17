import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import Sizes from './Sizes';
import Toppings from './Toppings';
import Summary from './Summary';
import ConfirmationModal from './ConfirmationModal';
import Total from './Total';
import Button from "./Button";
import info from '../data/info';
import toppings from '../data/toppings';
import pizzaSizes from '../data/sizes';
import customer from '../data/customer';
import BaseComponent from "../base/component";

export default class PizzaCreator extends BaseComponent  { 

  constructor(){
      super();

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

  //#region
  onToppingClick(topping) {

    const { selectedToppings, selectedSize, pizzaSizes } = this.state;
    const isExists = this.state.selectedToppings.find(({ name }) => name === topping.name);

    const newSelectedToppings = !isExists 
      ? [{ ...topping, amount: 1 }, ...selectedToppings] 
      : selectedToppings.filter(({ name }) => name !== topping.name);
    
    const newSelectedSize = selectedSize
    ? selectedSize
    : pizzaSizes[2];

    this.setState({
      selectedToppings : newSelectedToppings,
      selectedSize: newSelectedSize,
    });
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

    this.setState({
      selectedToppings: newSelectedToppings.filter(newSelectedTopping => !!newSelectedTopping),
    })
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

    this.setState({
      selectedToppings : newSelectedToppings,
    })
  }

  onFormChange(column, value){
    const { customer, info } = this.state;
    const newInfo = info.map(singleInfo => {
      const {column: newColumn} = singleInfo;

      if( newColumn === column && column === 'confirm email' 
      && this.state.customer['email'] !==value){
          alert('Please fill the previous box first or make sure they are matched');
          return {
              column,
              value: null,
          };
      }
      if (newColumn === column){
          const newValue = value;
          return {
              column, 
              value: newValue,
          }
      }        
      return singleInfo;
    })

    const newCustomer = (column !=='confirm email')
    ?  Object.assign({...customer, [column]: value})
    : customer;

    this.setState({
      info : newInfo,
      customer :newCustomer,
    });
  }
  
  onPizzaSizeSelected(pizzaSize){
    this.setState({
      selectedSize: pizzaSize
    })
  }

  validatingInputRequirement(){
    let isAlert = false;
    let message = 'Warning: Please fill up the follow input box: ';
    const { selectedSize, info } = this.state;
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
    this.setState({
      isDisplayConfirmationModal: false,
    });
  };

  onResetButtonClick(){

    const newInfo = info.map(element =>{
      const {column} = element;
      return {column, value:null};
    })
    
    this.setState({
      selectedToppings: [],
      customer: { name: '', email :'', address:'', postcode:'',mobile:'' },
      info: newInfo,
      selectedSize: null,
    })

  }

  onPlaceButtonClick(){
    this.setState({
      isDisplayConfirmationModal: true,
    })
  }
  //#endregion

  render(){
    const rootElement = document.createElement('div');

    // Confirmation Modal
    const confirmationModalContainer = ConfirmationModal({
      ...this.state, 
      validatingInputRequirement: this.validatingInputRequirement,
      onCancelButtonClick: this.onCancelButtonClick,
    });
    
    // Details Form
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('section');

    ReactDOM.render([
      React.createElement('h2', {key:'h2'}, 'Enter Your Details'),
      React.createElement(Form,{
        ...this.state,
        onFormChange: this.onFormChange,
        key:'form',
      })], detailsContainer
      );

    // Pizza Size
    const pizzaContainer = document.createElement('div');
    pizzaContainer.classList.add('section');

    ReactDOM.render([
      React.createElement('h2', {key:'h2'}, 'Pick Your Pizza'),
      React.createElement(Sizes,{
        ...this.state,
        onPizzaSizeSelected: this.onPizzaSizeSelected,
        key:'pizzaSizes',
      })
    ], pizzaContainer)
   

    // Pizza Toppings
    const toppingsContainer = document.createElement('div');
    toppingsContainer.classList.add('section');
    
    ReactDOM.render([
      React.createElement('h2', {key:'h2'}, 'Pick Your Toppings'),
      React.createElement(Toppings, {
        ...this.state,
        onToppingClick: this.onToppingClick, 
        key:'toppings'
      })],
      toppingsContainer,
    );

    // Summary
    const summaryContainer = document.createElement('div');    
    summaryContainer.classList.add('section');

    ReactDOM.render([
      React.createElement('h2', {key:'h2'}, 'Summary'),
      React.createElement(Summary, {
        ...this.state,
        onAddToppingClick: this.onAddToppingClick,
        onMinusToppingClick: this.onMinusToppingClick,
        key:'summary'
      }),
      React.createElement('hr', {key:'hr'}),
      React.createElement(Total, {...this.state, key:'total'}),
    ],
      summaryContainer,
    );


    // Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('section');

    ReactDOM.render(
      React.createElement(Button,{
        onPlaceButtonClick: this.onPlaceButtonClick,
        onResetButtonClick: this.onResetButtonClick,
      }),buttonContainer
    );

    rootElement.append(confirmationModalContainer, detailsContainer
      , pizzaContainer, toppingsContainer
      , summaryContainer, buttonContainer);
    
    return rootElement;
  };
}