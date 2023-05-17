import React, { Component } from 'react';
import '/App.css';
import News from "pages/News";
import Home from "pages/Home"
import FindRoute from "pages/FindRoute"
import TestFetch from "pages/TestFetch"
import {Route, Routes} from "react-router-dom";
import RideCreation from './pages/RideCreation';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Routes>
            <Route path="/" component={<Home/> } />
            <Route path="/news" component={<News/> } />
            <Route path="/routes" component={<FindRoute/> } />
            {/*<Route path="/login" component={<LogInModal/> } />*/}
            <Route path="/testFetch" component={<TestFetch/> } />
            <Route path="/rideForm" component={<RideCreation/> } />
          </Routes>
        </div>
    );
  }
}

export default App;
