import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../stylesheets/style.css"
import {Button, Form} from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, {useEffect, useState} from "react";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";
import axios from "axios";

function Navigation() {
    const [visible, setVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    useEffect(() => {
        axios.get('/check-token').then(response => {
            console.log(response.status, response.data);
            if(response.status === 200){
                setIsLoggedIn(false)
                setVisible(true)
            }
        }).catch(err =>{
            console.log(err);
        })
    });

    function logout() {
        axios.post('/logout').then(response => {
            console.log(response.status, response.data);
            if(response.status === 200){
                setIsLoggedIn(true)
                setVisible(false)
            }
        })
    }


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
                                { visible ?
                                    <Button className="button block" variant="outline-success" onClick={logout}>Log Out</Button>:null
                                }
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
                                            { isLoggedIn ?
                                                <Button className="button block" variant="outline-success" onClick={() => setModalShow(true)}>Sign Up</Button>:null
                                            }
                                            <SignUpModal show={modalShow} onHide={() => setModalShow(false)}/>
                                        </Col>
                                        <Col>
                                            { isLoggedIn ?
                                                <Button className="button block" variant="outline-success" onClick={() => setModalShow2(true)}>Log In</Button>:null
                                            }
                                            <LogInModal show={modalShow2} onHide={() => setModalShow2(false)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        { visible ?
                                            <Button className="block" variant="outline-secondary" onClick={logout}>Log Out</Button>:null
                                        }
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