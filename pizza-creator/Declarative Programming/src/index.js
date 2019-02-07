import render from './render';
 
function main() {
    const toppings = [{
      name: 'anchovy',
      price: '0.69',
    }, {
      name: 'bacon',
      price: '0.69',
    }, {
      name: 'basil',
      price: '0.69',
    }, {
      name: 'chili',
      price: '0.69',
    }, {
      name: 'mozzarella',
      price: '0.69',
    }, {
      name: 'mushroom',
      price: '0.69',
    }, {
      name: 'olive',
      price: '0.69',
    }, {
      name: 'onion',
      price: '0.69',
    }];

    const selectedToppings = [];

    const selectedSize = null;

    const info = [{
      column:'name',
      value:null
    },{
      column:'email',
      value:null
    },{
      column:'confirm email',
      value:null
    },{
      column:'address',
      value:null
    },{
      column:'postcode',
      value:null
    },{
      column:'contact number',
      value:null
    }];

    const customer = { 
      name: null, 
      email :null, 
      address:null, 
      postcode:null,
      'contact number':null 
    };

    const pizzaSizes =[{
      name:'Large', 
      size:'13', 
      price:'13',
    },{
       name:'Medium',
       size:'11', 
       price:'11',
    },{
      name:'Small',
      size:'9',
      price:'9',}];

    const state = {
      info,
      customer,
      pizzaSizes,
      selectedSize,
      toppings,
      selectedToppings,
      isDisplayConfirmationModal: false,
    };

    window.state = state;

    render(state);

    document.querySelector('button[type="reset"]').onclick = () => {
      state.selectedToppings = [];
      // state.customer = { name: '', email :'', address:'', postcode:'',mobile:'' };
      Object.keys(state.customer).forEach( thing => {
        state.customer[thing]=null;
      });
      const newInfo = info.map(element =>{
        const {column} = element;
        return {column, value:null};
      })
      state.info = newInfo;
      state.selectedSize = null;
      render(state);
    }

    document.querySelector('button[type="submit"]').onclick = () => {
      state.isDisplayConfirmationModal = true;
      render(state);
    };
  }

document.addEventListener('DOMContentLoaded', main);
