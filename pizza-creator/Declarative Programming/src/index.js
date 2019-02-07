import App from '../src/app';

function main() {
 
  new App();


    // document.querySelector('button[type="reset"]').onclick = () => {
    //   state.selectedToppings = [];
    //   // state.customer = { name: '', email :'', address:'', postcode:'',mobile:'' };
    //   Object.keys(state.customer).forEach( thing => {
    //     state.customer[thing]=null;
    //   });

    //   const newInfo = info.map(element =>{
    //     const {column} = element;
    //     return {column, value:null};
    //   })
    //   state.info = newInfo;
    //   state.selectedSize = null;
    //   render(state);
    // }
    // document.querySelector('button[type="submit"]').onclick = () => {
    //   state.isDisplayConfirmationModal = true;
    //   renderConfirmationModal(state);
    // };

    
  }

document.addEventListener('DOMContentLoaded', main);
