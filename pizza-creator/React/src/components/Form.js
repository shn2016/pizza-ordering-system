import React from 'react';

export default Form;

const Form = ({info, onFormChange}) => {
  return (
    <div className='details' >
      {info.map(({column, value: infoValue}) =>{
        return(
          <div 
            className='form-control'
            key= {column}
          >
            <label>{column}</label>
            <input type="text"></input>
          </div>
        )
      })}
    </div>
  )
}

