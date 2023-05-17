import axios from "axios";
import {useState} from "react"
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Map from "../components/Map";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import CustomAlert from "../components/Alerts";

const RideForm = () => {
    const state = useLocation().state;
    const [ride, setRide] = useState({
      email: state?.email || "", //For testing
      travel_start: state?.travel_start || "",
      seats_available: state?.seats_available || "",
      luggage_size: state?.luggage_size || "",
      start_location: state?.start_location || "",
      destination_location: state?.start_location || "",
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(
        ride.email,
        ride.travel_start,
        ride.seats_available,
        ride.luggage_size
      );
      try {
        state
          ? await axios.put(`/rides/${state.id}`, {
              email: ride.email,
              travel_start: ride.travel_start,
              seats_available: ride.seats_available,
              luggage_size: ride.luggage_size,
            })
          : await axios.post("/rides/new", {
              email: ride.email,
              travel_start: ride.travel_start,
              seats_available: ride.seats_available,
              luggage_size: ride.luggage_size,
            });
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setRide((ride) => ({ ...ride, [name]: value }));
    };
  
    return (
      <div className="App">
        <Navigation />
        <Container fluid="mt-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Row className="mb-4">
                <Col md="8">
                  <Form.Label>Email</Form.Label>
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
                  <Form.Label>Departure date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="travel_start"
                    value={ride.travel_start}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="4">
                  <Form.Label>Seats available</Form.Label>
                  <Form.Control
                    type="integer"
                    name="seats_available"
                    value={ride.seats_available}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
  <Col md="4">
    <Form.Label>Luggage size available</Form.Label>
    <Form.Control
      name="luggage_size"
      value={ride.luggage_size}
      onChange={handleChange}
    />
  </Col>
</Row>
<Row>
  <Col md="4">
    <div style={{ marginTop: '16px' }}></div> {/* Add space between the Luggage size and Select your route */}
    <Form.Label>Select your route</Form.Label>
    <div style={{ marginBottom: '16px' }}></div> {/* Add space between the label and the input */}
    <Map />
  </Col>
</Row>
<Row className="mt-4">
  <Col md="auto">
    <Button type="submit" className="btn btn-success">
      Create Ride
    </Button>
  </Col>
</Row>
  </Form.Group>
  </Form>
  </Container>
  </div>
  );
  };
  
  export default RideForm;
