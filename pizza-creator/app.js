

  
  
  
  
  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function render(state) {
    renderForm(state);
    renderSizes(state);
    renderToppings(state);
    renderSummary(state);
    renderConfirmationModal(state);
    renderTotal(state);
  }



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

    const info = ['name','email', 'confirm email', 'address', 'post code', 'contact number'] ;
    const pizzaSizes =[{name:'Large', size:'(13\')' }
      ,{name:'Medium' ,size:'(11\')'}
      ,{name:'Small' ,size:'(9\')'}];

    const state = {
      info,
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
      render(state);
    }

    document.querySelector('button[type="submit"]').onclick = () => {
      state.isDisplayConfirmationModal = true;
      render(state);
    };
  }

  document.addEventListener('DOMContentLoaded', main);