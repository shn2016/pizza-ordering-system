import getTotal from "../helper/getTotal";

export default function ConfirmationModal({ 
  isDisplayConfirmationModal, 
  selectedSize,
  selectedToppings, 
  customer, 
  validatingInputRequirement,
  onCancelButtonClick 
}) {
  return( (isDisplayConfirmationModal) && (!validatingInputRequirement)(
    <div className="confirmation-modal modal modal-box">
      <h1>Your Order Details</h1>
      <div class="addressDiv">
        <p><strong>{customer.name}</strong></p>
        <p>{customer.address}</p>
        <p>VIC {customer.postcode}</p>
        <p>{customer['contact number']}</p>
      </div>
      <hr/>
      <div className="pizzas">
        <div className="pizza">
          <div><strong>{selectedSize.name} Pizza</strong></div>
          <br/>
          <span>
             Summary
          </span>
        </div>
        <div>
          {getTotal({ selectedToppings, selectedSize })}
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
  ))
} 


