import PizzaCreator from './components/PizzaCreator';
import './styles/app.css'
import clearNode from './helper/clearNode';
function main() {
  const pizzaCreator = new PizzaCreator();
  
  const appContainer = document.querySelector('#app');
  clearNode(appContainer);
  pizzaCreator.enhancedRender(appContainer);
}

document.addEventListener('DOMContentLoaded', main);
