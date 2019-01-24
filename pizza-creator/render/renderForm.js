function renderForm(state){
    const parentNode = document.querySelector('.section .details');
    const { info, customer} = state;
    clearNode(parentNode);
    info.forEach( singleInfo => { 
        const div = document.createElement('div');
        div.classList.add('form-control');

        const label = document.createElement('label');
        label.innerText = singleInfo;

        const input = document.createElement('input');
        input.id = singleInfo;
        input.type='text'
        input.name = singleInfo;
        
        input.onchange = function() {
            onFormChange(singleInfo, input, state);
        }

        div.append(label,input);
        parentNode.append(div);
    });
}

function onFormChange(singleInfo, input, state){
    if (singleInfo ==='confirm email'){
        return;
    }

    state.customer[singleInfo] = input.value;
}