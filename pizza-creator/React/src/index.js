import React from 'react';
import ReactDOM from 'react-dom';
import PizzaCreator from './components/PizzaCreator';
import './styles/app.css'
import clearNode from './helper/clearNode';
function main() {
  ReactDOM.render(<PizzaCreator />, document.querySelector('#app'));
}

document.addEventListener('DOMContentLoaded', main);
