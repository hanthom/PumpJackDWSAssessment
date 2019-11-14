import React from 'react';
import _ from 'lodash';

const Pagination = props => {
  const { products, user } = props;
  return (
    <div>
      <h3> Products for {user.firstName} {user.lastName}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={user.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pagination;
