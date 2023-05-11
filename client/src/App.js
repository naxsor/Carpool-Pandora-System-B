import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout.js'

class App extends Component {

  state = {
    data: null
  };
  children = {
    text_1:"Demo 1",
    text_2:"Demo 2"
  };

  componentDidMount() {
    this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
        <div className="App">
          <Layout>
            {this.children}
          </Layout>
          <p className="App-intro">{this.state.data}</p>
        </div>
    );
  }
}

export default App;