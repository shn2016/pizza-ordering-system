export default function renderForm({info, onFormChange}){
    const rootElement = document.createElement('div');
    rootElement.classList.add('details');

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
            onFormChange(column, input);
        }

        div.append(label,input);
        rootElement.append(div);
    });
    return rootElement;
}

