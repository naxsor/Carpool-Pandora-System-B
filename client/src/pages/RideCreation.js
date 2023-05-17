import {Component} from "react"
import RideForm from "../components/RideForm";
import Layout from "../components/Layout";

class RideCreation extends Component {

    children = {
        column:<RideForm/>,
        // text_2:"Demo 2"
    };
    render(){
        return(
            <div className="App">
                <Layout>
                    {this.children}
                </Layout>
            </div>
        )
    }
}
export default RideCreation;