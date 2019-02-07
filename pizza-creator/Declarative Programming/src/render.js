import renderForm from '../render/renderForm';
import renderSizes from '../render/renderSizes';
import renderToppings from '../render/renderToppings';
import renderSummary from '../render/renderSummary';
import renderConfirmationModal from '../render/renderConfirmationModal';
import renderTotal from '../render/renderTotal';
import clearNode from '../helper/clearNode';

export default function render(state) {
    const rootElement = document.querySelector('#app');
    clearNode(rootElement);
    const confirmationModalContainer = document.createElement('div');
    confirmationModalContainer.classList.add('confirmation-modal');

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('section');
    const detailsH2 = document.createElement('h2');
    detailsH2.innerHTML = 'Enter Your Details';
    const detailsRoot = document.createElement('div');
    detailsRoot.classList.add('details');
    detailsContainer.append(detailsH2,detailsRoot);

    const pizzaContainer = document.createElement('div');
    pizzaContainer.classList.add('section');
    const pizzaH2 = document.createElement('h2');
    pizzaH2.innerHTML = 'Pick Your Pizza<'
    const pizzaRoot = document.createElement('div');
    pizzaRoot.classList.add('pizza-size')
    pizzaContainer.append(pizzaH2,pizzaRoot);

    const toppingsContainer = document.createElement('div');
    toppingsContainer.classList.add('section');
    const toppingH2 = document.createElement('h2');
    toppingH2.innerHTML = 'Pick Your Toppings';
    const toppingRoot = document.createElement('div');
    toppingRoot.classList.add('toppings')
    toppingsContainer.append(toppingH2,toppingRoot);

    const summaryContainer = document.createElement('div');    
    summaryContainer.classList.add('section');
    const summaryH2 = document.createElement('h2');
    summaryH2.innerHTML = 'Pick Your Toppings'
    const summaryUl = document.createElement('ul');
    summaryUl.classList.add('summary');
    const hr = document.createElement('hr');
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total');
    totalContainer.innerHTML = 'Total: $0';
    summaryContainer.append(summaryH2,summaryUl,hr,totalContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('section');
    const placeButton =document.createElement('button');
    placeButton.type='submit';
    placeButton.innerHTML='Place Order';
    const ClearButton =document.createElement('button');
    ClearButton.type='reset';
    ClearButton.innerHTML='Clear';
    buttonContainer.append(placeButton,ClearButton);

    rootElement.append(confirmationModalContainer,detailsContainer,pizzaContainer,toppingsContainer,summaryContainer,buttonContainer);

    renderForm(state);
    renderSizes(state);
    renderToppings(state);
    renderSummary(state);
    renderConfirmationModal(state);
    renderTotal(state);
  }

