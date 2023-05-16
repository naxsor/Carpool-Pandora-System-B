import "../stylesheets/style.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from 'react-bootstrap/Carousel';
import {Button} from "react-bootstrap";
import React from "react";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";

function Slideshow() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    return (
        <>
            <header className="bg-light">
                <Row>
                    <Col md="12">
                        {/*TODO: Change this as a react component*/}
                        <div className="overlay">
                            <h1 className="display-5 fw-bolder mb-2 text-white">College Rides</h1>
                            <Button className="home-button ms-2 text-white" variant="outline-success" onClick={() => setModalShow(true)}>Sign Up</Button>
                            <Button className="home-button ms-2" variant="outline-success" onClick={() => setModalShow2(true)}>Log In</Button>
                            <SignUpModal show={modalShow} onHide={() => setModalShow(false)}/>
                            <LogInModal show={modalShow2} onHide={() => setModalShow2(false)}/>
                        </div>
                        <Carousel variant="light" controls={false}>
                        <Carousel.Item>
                        <img
                        className="img-fluid mx-auto d-block w-100"
                        src="http://localhost:5000/comute1.jpg"
                        alt="First slide"
                        />
                        </Carousel.Item>
                        <Carousel.Item>
                        <img
                        className="img-fluid mx-auto d-block w-100"
                        src="http://localhost:5000/comute2.jpg"
                        alt="Second slide"
                        />
                        </Carousel.Item>
                        <Carousel.Item className="">
                        <img
                        className="img-fluid mx-auto d-block w-100"
                        src="http://localhost:5000/comute3.jpg"
                        alt="Third slide"
                        />
                        </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </header>
        </>
    );
}

export default Slideshow