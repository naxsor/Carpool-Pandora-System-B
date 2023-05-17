import {Component} from "react"
import RideForm from "../components/RideForm";
import RideFormLayout from "../components/RideFormLayout";
class RideCreation extends Component {

    children = {
        column:<RideForm/>,
        // text_2:"Demo 2"
    };
    render(){
        return(
            <div className="App">
                <RideFormLayout>
                    {this.children}
                </RideFormLayout>
            </div>
        )
    }
}
export default RideCreation;