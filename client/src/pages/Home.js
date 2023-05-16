import React, {Component} from "react";
import Navigation from "../components/Navigation";
import Slideshow from "../components/Slideshow"

class Home extends Component {

    state = {
        data: null
    };

    render() {
        return (
            <div className="App">
                <Navigation />
                <Slideshow/>
            </div>
        );
    }
}

export default Home;