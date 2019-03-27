import React from 'react';
import ToppingsTable from '../ToppingsTable';
import AddNewTopping from '../AddNewTopping';

class Topping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
    };

    this.onNewToppingAdded = this.onNewToppingAdded.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/product')
      .then((response) => response.json())
      .then((product) => {
        const toppings = product.map(product => {
          if(product.type === "toppings") return product;
        })
        this.setState({
          toppings,
        });
      });
  }

  onNewToppingAdded(topping) {
    const { toppings } = this.state;

    this.setState({
      toppings: [
        ...toppings,
        topping,
      ],
    })
  }

  render() {
    const { toppings } = this.state;

    return (
      <div>
        <ToppingsTable toppings={toppings} />
        <br />
        <br />
        <AddNewTopping onNewToppingAdded={this.onNewToppingAdded} />
      </div>
    )
  }
};

export default Topping;