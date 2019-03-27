import React from 'react';
import './ToppingsTable.css';

class ToppingsTable extends React.Component {
  render() {
    const { toppings } = this.props;

    return (
      <div className="toppings-table">
        <h2>Toppings</h2>
        <table className="toppings">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {toppings.map(({
              id, name, price, imageUrl
            }) => (
              <tr key={id}>
                <td>
                  <img src={imageUrl} alt={name} />
                </td>
                <td>{name}</td>
                <td>$ {price}</td>
                <td className="action">
                  <button type="button">Update</button>
                  &nbsp;
                  <button type="button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ToppingsTable;