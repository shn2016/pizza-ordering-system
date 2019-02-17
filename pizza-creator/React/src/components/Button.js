import React from 'react';

export default function Button({onPlaceButtonClick, onResetButtonClick}){
    
    const placeButton = React.createElement('button',{
        type:'submit',
        onClick: () =>  onPlaceButtonClick(),
        key:'placeButton',
    },'Place Order');
    
    const resetButton = React.createElement('button',{
        type:'reset',
        onClick: () =>  onResetButtonClick(),
        key:'resetButton',
    },'Clear');

    const rootElement = React.createElement('div', null, [placeButton, resetButton])

    return rootElement;
  }