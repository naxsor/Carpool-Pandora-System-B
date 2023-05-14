import React, {Component} from "react";
import Layout from '../components/Layout'
import Navigation from "../components/Navigation";
import Slideshow from "../components/Slideshow"

class Home extends Component {

    state = {
        data: null
    };
    children = {
        text_1:"Demo Demo 1",
        text_2:"Demo Demo 2"
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