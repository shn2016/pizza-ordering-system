import React from 'react';
import pizza from '../images/pizza.svg';

export default Sizes;

const Sizes = ({ 
  pizzaSizes, 
  selectedSize, 
  onPizzaSizeSelected
}) => {
  return(
    <div className='pizza-size'>
      {pizzaSizes.map(pizzaSize =>{
        const { name, size } = pizzaSize;
        return(
          <div
          className = {`img ${name} ${(selectedSize && name === selectedSize.name)? 'active' : null}`}
          onClick= {() => onPizzaSizeSelected(pizzaSize)}
          key= {name}
          >
            <img alt={name} src={pizza} className='pizzaImg'/>
            <span>{name}  {size}'</span>
          </div>
        )
      })}
    </div>
  )
}
