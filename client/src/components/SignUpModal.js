import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import axios from "axios";
import CustomAlert from "./Alerts";

function SignUpForm() {
    const [show, setshow] = useState(false);
    const [variant, setvariant] = useState("danger");
    const [messege, setMessege] = useState("Mensaje")
    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [confirmemail,setConfirmEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password,setPassword] = useState(null);
    let children = {message:messege, show:show, variant:variant}
    // const [confirmPassword,setConfirmPassword] = useState(null);
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstname"){
            setFirstName(value);
        }
        if(id === "lastname"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "confirmemail"){
            setConfirmEmail(value);
        }
        if(id === "phone"){
            setPhone(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        // if(id === "confirmPassword"){
        //     setConfirmPassword(value);
        // }

    }

    const handleSubmit  = (e) => {
        e.preventDefault();
        axios.post("/register", {
            firstname:firstname,
            lastname:lastname,
            email:email,
            confirmemail:confirmemail,
            phone:phone,
            password:password}).then((response) => {
                if(response.status === 200){
                    setvariant("success")
                    setshow(true)
                    setMessege("User has been created.")
                }
                console.log(response.status, response.data);
        }).catch(error => {
            if (error.response){

            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message)
            }
            if (error.message === "Request failed with status code 403"){
                setshow(true)
                setvariant("danger")
                setMessege("This e-mail is already linked to another account.")
            }
            console.log(error.config)
        });
    }

    return (
        <Form id="signupform" onSubmit={handleSubmit}>
            <Form.Group>
                <CustomAlert>{children}</CustomAlert>
                <Row className="mb-4">
                    <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control id="firstname" value={firstname} onChange = {(e) => handleInputChange(e)} type="firstname" placeholder="First Name"/>
                    </Col>
                    <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control id="lastname" value={lastname} onChange = {(e) => handleInputChange(e)} type="lastname" placeholder="Last Name"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control id="email" value={email} onChange = {(e) => handleInputChange(e)} type="email" placeholder="Write Email"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Label>Confirm Email</Form.Label>
                        <Form.Control id="confirmemail" value={confirmemail} onChange = {(e) => handleInputChange(e)} type="email" placeholder="Confirm Email"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control id="phone" value={phone} onChange = {(e) => handleInputChange(e)} type="tel" placeholder="Phone"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" value={password} onChange = {(e) => handleInputChange(e)} type="password" placeholder="Password"/>
                        {/*<Form.Text className="text-muted">*/}
                        {/*    We'll never share your email with anyone else.*/}
                        {/*</Form.Text>*/}
                    </Col>
                    <Col>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password"/>
                        {/*<Form.Text className="text-muted">*/}
                        {/*    We'll never share your email with anyone else.*/}
                        {/*</Form.Text>*/}
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}

function SignUpModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <SignUpForm/>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button form="signupform" type="submit">Sign Up</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpModal