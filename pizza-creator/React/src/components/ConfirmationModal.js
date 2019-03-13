import getTotal from "../helper/getTotal";
import React from 'react';

//another declaration way
export default ({ 
  selectedSize,
  selectedToppings, 
  customer, 
  onCancelButtonClick 
}) => {
  return ( 
    <div className="confirmation-modal">
    <div className="modal">
    <div className="modal-box">
      <h1>Your Order Details</h1>
      <div className="addressDiv">
        <p><strong>{customer["name"]}</strong></p>
        <p>{customer["address"]}</p>
        <p>VIC {customer["postcode"]}</p>
        <p>{customer["contact number"]}</p>
      </div>
      <hr/>
      <div className="pizzas">
        <div className="pizza">
          <div><strong>{selectedSize.name} Pizza</strong></div>
        </div>
        <div>
          {selectedToppings.map( ({name, amount}) => {
            return <span> {name} * {amount}; </span>
          })}
        </div>
        <div>
          Total: ${getTotal({selectedToppings, selectedSize})}
        </div>
      </div>
      <div className="action">
        <button className="cancel" onClick= { () => onCancelButtonClick() }>
          Cancel
        </button>
        <button className="confirm" >
          Confirm
        </button>
      </div>
    </div>
    </div></div>
  )
} 


