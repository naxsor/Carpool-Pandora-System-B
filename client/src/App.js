import React, { Component } from 'react';
import '/App.css';
import News from "pages/News";
import Home from "pages/Home"
import TestFetch from "pages/TestFetch"
import {Route, Routes} from "react-router-dom";
import RideCreation from './pages/RideCreation';
import RideRequest from './pages/RideRequest';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Routes>
            <Route path="/" component={<Home/> } />
            <Route path="/news" component={<News/> } />
            {/*<Route path="/login" component={<LogInModal/> } />*/}
            <Route path="/testFetch" component={<TestFetch/> } />
            <Route path="/rideForm" component={<RideCreation/> } />
            <Route path="/rideRequest" component={<RideRequest/> } />
          </Routes>
        </div>
    );
  }
}

export default App;