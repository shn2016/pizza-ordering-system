import PizzaCreaetir from './components/PizzaCreator';
import './styles/app.css'
import clearNode from './helper/clearNode';
function main() {
  const pizzaCreaetir = new PizzaCreaetir();
  
  const appContainer = document.querySelector('#app');
  clearNode(appContainer);
  pizzaCreaetir.enhancedRender(appContainer);
}

document.addEventListener('DOMContentLoaded', main);
