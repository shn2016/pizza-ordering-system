import React from 'react';


export default ({info, onFormChange}) => (
  <div className='details' >
    {info.map(element =>{
      const {column, value} = element;
      return(
        <div className='form-control' key= {column} >
          <label>{column}</label>
          <input 
            value = {value || ""}
            onChange={event => onFormChange(column, event.target.value)}
          />
        </div>
      )
    })}
  </div>
)

