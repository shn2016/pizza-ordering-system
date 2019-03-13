import React from 'react';
import Form from './Form';
import Sizes from './Sizes';
import Toppings from './Toppings';
import Summary from './Summary';
import ConfirmationModal from './ConfirmationModal';
import Button from "./Button";
import toppings from '../data/toppings';
import pizzaSizes from '../data/sizes';
import customer from '../data/customer';

export default class PizzaCreator extends React.Component  { 

  constructor(props){
      super(props);

      this.state = {
      customer,
      pizzaSizes,
      selectedSize:null,
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
    const { customer } = this.state;
    const newCustomer = {};
    Object.keys(customer).forEach(element => {
      if(element === column){
        newCustomer[element] = value;
      } else {
        newCustomer[element] = customer[element]
      }
    });
    this.setState({
      customer: newCustomer,
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
    
    const { selectedSize, customer } = this.state;
    Object.keys(customer).forEach( column => {
      if(customer[column] === null){
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
    const { customer } = this.state;
    const newCustomer = {};

    Object.keys(customer).forEach(key =>{
      newCustomer[key] = null;
    });

    this.setState({
      selectedToppings: [],
      customer: newCustomer,
      selectedSize: null,
    })
  }

  onPlaceButtonClick(){
    this.setState({
      isDisplayConfirmationModal: true,
    });
  }
  //#endregion

  render(){
    const { 
      customer,
      pizzaSizes,
      selectedSize,
      toppings,
      selectedToppings,
      isDisplayConfirmationModal,
    } = this.state;

    return (
      <React.Fragment>
        {isDisplayConfirmationModal && !this.validatingInputRequirement() &&
        (<ConfirmationModal
          selectedSize = {selectedSize}
          selectedToppings = {selectedToppings}
          customer = {customer}
          onCancelButtonClick  = {this.onCancelButtonClick}
        />)
        }
        <div className = "section">
          <h1>Enter Your Details</h1>
          <Form
            customer = {customer}
            onFormChange = {this.onFormChange}
          />
        </div>
        <div className = "section">
          <h1>Pick Your Pizza</h1>
          <Sizes 
            pizzaSizes = {pizzaSizes}
            selectedSize = {selectedSize}
            onPizzaSizeSelected = {this.onPizzaSizeSelected}
          />
        </div>
        <div className = "section">
          <h1>Pick Your Toppings</h1>
          <Toppings 
            toppings = {toppings}
            selectedToppings = {selectedToppings}
            onToppingClick  = {this.onToppingClick}
          />
        </div>
        <div className = "section">
          <h1>Summary</h1>
          <Summary 
            selectedToppings = {selectedToppings}
            selectedSize = {selectedSize}
            onAddToppingClick = {this.onAddToppingClick}
            onMinusToppingClick = {this.onMinusToppingClick}
          />
          <hr/>
          <div className = 'total'>
            Total: {getTotal({ selectedToppings, selectedSize })}
          </div>
        </div>
        <div className = "section">
          <Button 
            onPlaceButtonClick = {this.onPlaceButtonClick}
            onResetButtonClick = {this.onResetButtonClick}
          />
        </div>
      </React.Fragment>
    );
  }
}