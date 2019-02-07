import clearNode from "../helper/clearNode";
import render from '../src/render';

export default function renderForm(state){
    const parentNode = document.querySelector('.section .details');
    const { info, customer} = state;
    clearNode(parentNode);
    info.forEach( ({column, value}) => { 
        const div = document.createElement('div');
        div.classList.add('form-control');

        const label = document.createElement('label');
        label.innerText = column;

        const input = document.createElement('input');
        input.id = column;
        input.type='text'
        input.name = column;
        if (value){input.value=value};
        
        input.onchange = function() {
            onFormChange(column, input, state);
        }

        div.append(label,input);
        parentNode.append(div);
    });
}

function onFormChange(column, input, state){
    
    const { info } = state;

    const newInfo = info.map(singleInfo => {
        const {column: newColumn} = singleInfo;

        if( newColumn === column && column === 'confirm email' && state.customer['email'] !==input.value){
            alert('Please fill the previous box first or make sure they are matched');
            return {
                column,
                value: null,
            };
        }
        if (newColumn === column){
            const newValue = input.value;
            return {
                column, 
                value: newValue,
            }
        }        
        return singleInfo;
    })
    state.info = newInfo;

    if (column !=='confirm email'){
        state.customer[column] = input.value;
    }

    render(state);
}