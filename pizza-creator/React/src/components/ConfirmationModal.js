import getTotal from "../helper/getTotal";
import React from 'react';

//another declaration way
export default
({ 
  selectedSize,
  selectedToppings, 
  info, 
  onCancelButtonClick 
}) => {
  return( 
    <div className="confirmation-modal">
    <div className="modal">
    <div className="modal-box">
      <h1>Your Order Details</h1>
      <div class="addressDiv">
        <p><strong>{info[0].value}</strong></p>
        <p>{info[3].value}</p>
        <p>VIC {info[4].value}</p>
        <p>{info[5].value}</p>
      </div>
      <hr/>
      <div className="pizzas">
        <div className="pizza">
          <div><strong>{selectedSize.name} Pizza</strong></div>
          <br/>
          <span>Summary</span>
        </div>
        <div>
          {getTotal({ selectedToppings, selectedSize})}
        </div>
      </div>
      <div className="action">
        <button className="cancel" onClick= {()=>onCancelButtonClick()}>
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


