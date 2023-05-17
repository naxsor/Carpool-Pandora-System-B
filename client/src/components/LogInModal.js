import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import CustomAlert from "./Alerts";
import "../stylesheets/style.css"
import axios from "axios";
// import {useNavigate} from "react-router-dom";
function LogInForm() {
    // const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const [variant, setvariant] = useState("danger");
    const [messege, setMessege] = useState("Mensaje")
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    let children = {message: messege, show: show, variant: variant}
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === null) {
            setvariant("warning")
            setMessege("Email is empty.")
            setshow(true)
            return null
        }
        if (password === null) {
            setvariant("warning")
            setMessege("Password is empty")
            setshow(true)
            return null
        }

        axios.post("/login", {
            email:email,
            password:password
        }).then(response => {
            if (response.data) {
                console.log(response.status, response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            // navigate("/")
            return response;
        })
    }

    return (
        <Form id="loginform" onSubmit={handleSubmit}>
            <CustomAlert>{children}</CustomAlert>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control id="email" value={email} onChange={(e) => handleInputChange(e)} type="email"
                              placeholder="Write Email"/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" value={password} onChange={(e) => handleInputChange(e)} type="password"
                              placeholder="Password"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
            </Form.Group>
        </Form>
    );
}

function LogInModal(props) {
    function login(){
        axios.get('/check-token').then(response => {
            console.log(response.status, response.data);
            if(response.status === 200){
                props.onHide()
                // window.location.reload(false);
            }
        }).catch(err =>{
            // console.log(err);
        })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Log In
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LogInForm/>
            </Modal.Body>
            <Modal.Footer>
                <Button className="button" form="loginform" type="submit" onClick={login}>Log In</Button>
                <Button className="button" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogInModal