import React from 'react';


export default ({customer, onFormChange}) => (
  <div className='details'>
    {Object.keys(customer).map(column => {
      const columnValue = customer[column];
      return (
        <div className='form-control' key={column}>
          <label>{column}</label>
          <input 
            value = {(!columnValue)? "" : columnValue}
            onChange = {event => onFormChange(column, event.target.value)}
          />
        </div>
      )
    })}
  </div>
)

