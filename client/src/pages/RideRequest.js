import {Component} from "react"
import RideDisplayForm from "../components/RideDisplayForm";
import RideFormLayout from "../components/RideFormLayout";
class RideRequest extends Component {

    children = {
        column:<RideDisplayForm/>,
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
export default RideRequest;