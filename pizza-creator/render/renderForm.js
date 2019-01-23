function renderForm(state){
    const parentNode = document.querySelector('.section.details');
    const { info } = state;

    info.forEach( element => { 
        const div = document.createElement('div');
        div.classList.add('form-control');

        const label = document.createElement('label');
        label.innerText = element;

        const input = document .createElement('input');
        input.type='text'
        input.name = element;

        div.append(label,input);
        parentNode.append(div);
        
    });
}