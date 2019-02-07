import render from '../render';

export default function renderForm(state){
    const rootElement = document.createElement('div');
    rootElement.classList.add('details');

    const { info } = state;
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
        rootElement.append(div);
    });
    return rootElement;
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