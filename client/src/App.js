import React, { Component } from 'react';
import '/App.css';
import News from "pages/News";
import Home from "pages/Home"
import TestFetch from "pages/TestFetch"
import {Route, Routes} from "react-router-dom";
import RideForm from './pages/RideForm';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Routes>
            <Route path="/" component={<Home/> } />
            <Route path="/news" component={<News/> } />
            <Route path="/testFetch" component={<TestFetch/> } />
            <Route path="/rideForm" component={<RideForm/> } />
          </Routes>
        </div>
    );
  }
}

export default App;