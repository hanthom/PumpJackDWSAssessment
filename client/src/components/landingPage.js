import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './pagination';
import List from './list';
import { paginate } from './paginate';


class LandingPage extends Component {
  state = {
    products: [],
    users: [],
    usersCount: 0,
    currentPage: 1,
    currentUser: null,
    viewProducts: false,
  }

  // Loads list of managers on initial page load.
  async componentDidMount() {
    const response = await axios.get("http://localhost:9000/users/");
    this.setState({ users: response.data, usersCount: response.data.length })
  }

  async logInAsUser(user) {
    const response = await axios.post("http://localhost:9000/auth/", { email: user.email })
    this.setState({ authToken: response.data, currentUser: user });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page, viewProducts: false });
  }

  async selectUser(user) {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': this.state.authToken
    };
    const response = await axios.get(`http://localhost:9000/products/user/${user.id}`, { headers });
    let products = null;
    if (response.data) products = response.data;
    this.setState({ products: products, viewProducts: true });
  }

  render() {

    const paginatedUsers = paginate(this.state.users, this.state.currentPage, 1);
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>View Products</th>
              <th>Log In</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-primary m-2" onClick={() => this.selectUser(user)}>
                    View
                  </button>
                </td>
                <td>
                  {!this.state.authToken ? <button className="btn btn-primary m-2" onClick={() => this.logInAsUser(user)}>
                    Authenticate
                  </button> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.viewProducts ? <List
          products={this.state.products}
          user={this.state.currentUser}
        /> : null}
        <Pagination
          usersCount={this.state.usersCount}
          pageSize={1}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
      </div>
    )
  }
}

export default LandingPage;
