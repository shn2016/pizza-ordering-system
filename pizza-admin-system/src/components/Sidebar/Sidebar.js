import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <div className="brand">
      <h1>Pizza Creator Admin</h1>
    </div>
    <div className="menu">
      <a className="active">Topping</a>
      <a>Size</a>
    </div>
  </div>
);

export default Sidebar;