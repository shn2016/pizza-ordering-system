import React from 'react';
import logo from '../assets/Pizza.svg'
import './Sidebar.css';

const Sidebar = () => (
  <div className = "sidebar">
    <div className = "brand">
      <img src = {logo} alt="Pizza Creator Admin" />
    </div>
    <div className="menu">
      <a className="menu-item">Topping</a>
    </div>
  </div>
)

export default Sidebar;