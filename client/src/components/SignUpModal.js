import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import axios from "axios";
import CustomAlert from "./Alerts";
import "../stylesheets/style.css"


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
    const [confirmpassword,setsonfirmpassword] = useState(null);

    let children = {message:messege, show:show, variant:variant}
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
        if(id === "confirmpassword"){
            setsonfirmpassword(value);
        }

    }

    const handleSubmit  = (e) => {
        e.preventDefault();

        if(firstname === null){
            setvariant("warning")
            setMessege("First Name is empty.")
            setshow(true)
            return null
        }
        if(lastname === null){
            setvariant("warning")
            setMessege("Last Name is empty.")
            setshow(true)
            return null
        }
        if(email === null){
            setvariant("warning")
            setMessege("Email is empty.")
            setshow(true)
            return null
        }
        if(confirmemail === null){
            setvariant("warning")
            setMessege("Please confirm email.")
            setshow(true)
            return null
        }
        if(confirmemail === null){
            setvariant("warning")
            setMessege("Phone is empty")
            setshow(true)
            return null
        }
        if(phone === null){
            setvariant("warning")
            setMessege("Phone is empty")
            setshow(true)
            return null
        }
        if(password === null){
            setvariant("warning")
            setMessege("Password is empty")
            setshow(true)
            return null
        }
        if(confirmpassword === null){
            setvariant("warning")
            setMessege("Please confirm password.")
            setshow(true)
            return null
        }


        axios.post("/register", {
            firstname:firstname,
            lastname:lastname,
            email:email,
            confirmemail:confirmemail,
            phone:phone,
            password:password,
            confirmpassword:confirmpassword}).then((response) => {
            console.log(response.status, response.data);
            if(response.status === 200){
                    setvariant("success")
                    setshow(true)
                    setMessege("User has been created.")
                }
        }).catch(error => {
            if (error.response){

            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message)
            }
            if (error.response.status === 403){
                setshow(true)
                setvariant("danger")
                setMessege("This e-mail is already linked to another account.")
            }
            if(error.response.status === 501){
                setshow(true)
                setvariant("warning")
                setMessege("No numeric characters on First Name.")
            }
            if(error.response.status === 502){
                setshow(true)
                setvariant("warning")
                setMessege("No numeric characters on Last Name.")
            }
            if(error.response.status === 503){
                setshow(true)
                setvariant("warning")
                setMessege("Invalid email on 'email' field.")
            }
            if(error.response.status === 504){
                setshow(true)
                setvariant("warning")
                setMessege("Invalid email on 'confirm email' field.")
            }
            if(error.response.status === 505){
                setshow(true)
                setvariant("warning")
                setMessege("Emails do not match.")
            }
            if(error.response.status === 506){
                setshow(true)
                setvariant("warning")
                setMessege("Phone number is not valid.")
            }
            if(error.response.status === 507){
                setshow(true)
                setvariant("warning")
                setMessege("Passwords are not equal")
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
                    </Col>
                    <Col>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control id="confirmpassword" type="password" value={confirmpassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
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
                <Button className="button" form="signupform" type="submit">Sign Up</Button>
                <Button className="button" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpModal