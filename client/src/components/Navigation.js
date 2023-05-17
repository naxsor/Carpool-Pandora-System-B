import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../stylesheets/style.css"
import {Button, Form} from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";

function Navigation() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    return (
        <>
            {["false"].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand}>
                    <Container fluid>
                        <Navbar.Brand href="/">College Rides</Navbar.Brand>

                        <Nav className="ms-auto m-2">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Button className="button ms-2" variant="outline-success">Search</Button>
                            </Form>

                        </Nav>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Carpooling
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/news">News</Nav.Link>
                                    <Nav.Link href="/routes">Routes</Nav.Link>
                                    <Nav.Link href="/rideForm">Create a ride</Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <hr className="hr hr-blurry"/>
                                    <Row>
                                        <Col>
                                            <Button className="button block" variant="outline-success" onClick={() => setModalShow(true)}>Sign Up</Button>
                                            <SignUpModal show={modalShow} onHide={() => setModalShow(false)}/>
                                        </Col>
                                        <Col>
                                            <Button className="button block" variant="outline-success" onClick={() => setModalShow2(true)}>Log In</Button>
                                            <LogInModal show={modalShow2} onHide={() => setModalShow2(false)}/>
                                        </Col>
                                    </Row>

                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
export default Navigation