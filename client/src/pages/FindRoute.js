import React, { Component } from "react";
import Navigation from "../components/Navigation";
import Layout from '../components/Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

class FindRoute extends Component {
  state = {
    data: null,
    searchLocation: ''
  };

  children = {
    column: "Demo 1",
    // text_2:"Demo 2"
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        console.log(res); // Check the response structure
        this.setState({ data: res.express });
      })
      .catch(err => console.log(err));
  }
  

  // Fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleSearchLocation = (e) => {
    this.setState({ searchLocation: e.target.value });
  };

  render() {
    const { data, searchLocation } = this.state;
    const filteredData = data && data.filter(item =>
      item.location.toLowerCase().includes(searchLocation.toLowerCase())
    );

    return (
      <div className="App">
        <Layout>
          {this.children}
        </Layout>
        <Form.Group className="mt-4">
          <Form.Control
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={this.handleSearchLocation}
          />
        </Form.Group>
        <ListGroup className="mt-4">
          {filteredData && filteredData.map(item => (
            <ListGroup.Item key={item.id}>
              <strong>{item.member_id}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default FindRoute;
