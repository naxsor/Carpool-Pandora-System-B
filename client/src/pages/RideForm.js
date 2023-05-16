import axios from "axios";
import {useState} from "react"
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import CustomAlert from "../components/Alerts";

const RideForm = () => {
    
    const state = useLocation().state
    const [ride, setRide] = useState([{
        email: state?.email || "", //For testing
        travel_start: state?.travel_start || "",
        seats_available: state?.seats_available || "",
        luggage_size: state?.luggage_size || "",
        start_location: state?.start_location || "",
        destination_location: state?.start_location || ""
    }])
    const [show, setshow] = useState(false);
    const [variant, setvariant] = useState("danger");
    const [message, setMessage] = useState("Mensaje")

    let children = {message:message, show:show, variant:variant}

    function validDate() {
        var dateString = ride.travel_start;
        var inputDate = new Date(dateString)
        var today = new Date()
        if( today > inputDate){
            throw Object.assign(
                new Error(),
                {code: 403 }
            )
            
            ;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(ride.email, ride.travel_start, ride.seats_available, ride.luggage_size)
        
        try{
            validDate()
        }
        catch(err){
            setvariant("danger")
            setMessage("Departure date must be in the future.")
            setshow(true)
            return console.log(err)
        }

        state 
        ? await axios.put(`/rides/${state.id}`, {
            email: ride.email,
            travel_start: ride.travel_start,
            seats_available: ride.seats_available,
            luggage_size: ride.luggage_size
        })
        : await axios.post('/rides/new', {
            email: ride.email,
            travel_start: ride.travel_start,
            seats_available: ride.seats_available,
            luggage_size: ride.luggage_size
        }).then((response) => {
            console.log(response.status, response.data);
            if(response.status === 200){
                    setvariant("success")
                    setshow(true)
                    setMessage("Your ride has been created.")
                    document.getElementById("create-button").style.visibility = 'hidden'
                }
        }).catch(error => {
            console.log(error)
        });
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRide((ride) => ({...ride, [name]:value}))
    };

    return (
        <div className="App">
            <Navigation/>
            <CustomAlert>{children}</CustomAlert>
            <Container fluid="mt-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Row className="mb-4">
                            <Col md="8">
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="email"
                                    value={ride.email}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md="4">
                                 <Form.Label>
                                 Departure date
                                </Form.Label>
                                <Form.Control 
                                    type="datetime-local"
                                    name="travel_start"
                                    value={ride.travel_start}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col md="4">
                            <Form.Label>
                            Seats available
                                </Form.Label>
                                <Form.Control 
                                    type="number"
                                    name="seats_available"
                                    value={ride.seats_available}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                            <Form.Label>
                            Luggage size available
                                </Form.Label>
                                <Form.Control 
                                    name="luggage_size"
                                    value={ride.luggage_size}
                                    onChange={handleChange}
                                    required
                                />
                                </Col>
                        </Row>
                        <Row className="d-flex justify-content-end">
                            <Col md="4">
                            <Button type="submit" className="btn btn-success btn-lg mr-auto">Create Ride</Button>
                            </Col>
                        </Row>
                        
                    </Form.Group>
                    
                </Form>
            </Container>
            

        </div>
    );
};
export default RideForm;