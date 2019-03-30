import React from 'react';
import Section from './Section';
import Sizes from './Sizes';
import Toppings from './Toppings';
import Summary from './Summary';
import ConfirmationModal from './ConfirmationModal';
import Button from "./Button";
import toppings from '../data/toppings';
import pizzaSizes from '../data/sizes';
import getTotal from '../helper/getTotal'
import DetailsForm from './DetailsForm';
export default class PizzaCreator extends React.Component  { 

  constructor(props){
      super(props);

      this.state = {
      pizzaSizes,
      selectedSize:null,
      toppings,
      selectedToppings: [],
      detailsFormData: {},
      detailsFormDirty: false,
      showConfirmationModal: false,
    };

    this.onToppingClick = this.onToppingClick.bind(this); 
    this.onMinusToppingClick = this.onMinusToppingClick.bind(this); 
    this.onAddToppingClick = this.onAddToppingClick.bind(this); 
    this.onDetailsFormDataChange = this.onDetailsFormDataChange.bind(this); 
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

  onDetailsFormDataChange(name, value){
    const { detailsFormData } = this.state;

    const newDetailsFormData = {
      ...detailsFormData,
      [name]: value,
    };

    this.setState({
      detailsFormData: newDetailsFormData,
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
      this.state.showConfirmationModal = false;
    }
    
    if (selectedSize === null) {
      isAlert = true;
      alert('Please select a pizza.');
      this.state.showConfirmationModal = false;
    }

    return isAlert;
  };

  onCancelButtonClick(){
    this.setState({
      showConfirmationModal: false,
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

  validateDetailsFormData(data) {
    return Object.values(data).every(v => !!v);
  }

  onPlaceButtonClick(){
    const { detailsFormData } = this.state;

    event.preventDefault();
    
    this.setState({
      detailsFormDirty: true,
    });
      
    const validate = this.validateDetailsFormData(detailsFormData);

    if (!validate) {
      return;
    }

    this.setState({ 
      showConfirmationModal: true 
    });
  }
  //#endregion

  render(){
    const { 
      pizzaSizes,
      selectedSize,
      toppings,
      detailsFormData,
      detailsFormDirty,
      selectedToppings,
      showConfirmationModal,
    } = this.state;

    return (
      <React.Fragment>
        {showConfirmationModal&&
        (<ConfirmationModal 
          details={detailsFormData}
          selectedSize={selectedSize}
          selectedToppings={selectedToppings}
          onClose={() => this.setState({ showConfirmationModal: false })}
        />)
        }
        <Section title='Enter Your Details'>
          <DetailsForm
            data = {detailsFormData} 
            dirty = {detailsFormDirty}
            onDataChange = {this.onDetailsFormDataChange}
          />
        </Section>
        <Section title='Pick Your Pizza'>
          <Sizes 
            pizzaSizes = {pizzaSizes}
            selectedSize = {selectedSize}
            onPizzaSizeSelected = {this.onPizzaSizeSelected}
          />
        </Section>
        <Section title='Pick Your Toppings'>
          <Toppings 
            toppings = {toppings}
            selectedToppings = {selectedToppings}
            onToppingClick  = {this.onToppingClick}
          />
        </Section>
        <Section title='Summary'>
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
        </Section>
        <Section title='Summary'>
          <Button 
            onPlaceButtonClick = {this.onPlaceButtonClick}
            onResetButtonClick = {this.onResetButtonClick}
          />
        </Section>
      </React.Fragment>
    );
  }
}