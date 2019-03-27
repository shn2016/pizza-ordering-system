import React from 'react';
import axios from 'axios';
import './AddNewTopping.css';

class AddNewTopping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topping: {
        type: "toppings",
      },
    };

    this.onToppingChange = this.onToppingChange.bind(this);
  }

  onToppingChange(key, value) {
    const { topping } = this.state;
    
    this.setState({
      topping: {
        ...topping,
        [key]: value,
      },
    });
  }

  render() {
    const { topping } = this.state;
    const { onNewToppingAdded } = this.props;

    return (
      <form 
        className="add-new-topping"
        onSubmit={(event) => {
          event.preventDefault();
          topping['price'] = parseFloat(topping.price);
          axios.post('http://localhost:3000/product', topping)
            .then(({ data }) => onNewToppingAdded(data))
        }}
      >
        <h2>Add New Topping</h2>
        <div className="form-items">
          <input 
            value={topping.image || ''} 
            onChange={({ target: { value } }) => this.onToppingChange('image', value)} 
            placeholder="Image URL" 
          />
          <input 
            value={topping.name || ''} 
            onChange={({ target: { value } }) => this.onToppingChange('name', value)} 
            placeholder="Name" 
          />
          <input 
            value={topping.price || ''} 
            onChange={({ target: { value } }) => this.onToppingChange('price', value)} 
            placeholder="Price" 
          />
        </div>
        <br />
        <button>Add</button>
      </form>
    );
  }
}

export default AddNewTopping;