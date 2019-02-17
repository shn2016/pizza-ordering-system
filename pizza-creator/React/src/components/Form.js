import React from 'react';

export default function Form({info, onFormChange}){
    
  const infoDivs = info.map( ({column, value: infoValue}) => { 
    const label = React.createElement('label',{
        key: 'label',
    }, column);

    const input = React.createElement('input',{
        type: 'text',
        key: 'input',
        name: column,
        value:'',
        //onChange: () => onFormChange(column, value)
    });
    if(!!infoValue){input.value=infoValue};

    const infoDiv = React.createElement('div',{
        className:'form-control',
        key: column,
      }, [label, input]);
    return infoDiv;
  });

  const rootElement = React.createElement('div',{
    className:'details'
  }, infoDivs );

  return rootElement;
}

