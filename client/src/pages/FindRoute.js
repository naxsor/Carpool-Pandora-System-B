import React, {Component} from "react";
import Navigation from "../components/Navigation";
import Map from "../components/Map";

class FindRoute extends Component {
    state = {
        data: null,
        startLocation: null,
        destination: null,
      };
    
      handleStartLocationSelect = (place) => {
        this.setState({ startLocation: place });
      };
    
      handleDestinationSelect = (place) => {
        this.setState({ destination: place });
      };
    
      render() {
        const { startLocation, destination } = this.state;
    
        return (
          <div className="App">
            <Navigation />
            <Map startLocation={startLocation} destination={destination} />
          </div>
        );
      }
}

export default FindRoute;