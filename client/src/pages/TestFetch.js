import axios from "axios";
import {useEffect} from "react"
import {useState} from "react"
import Navigation from "../components/Navigation";
import Layout from "../components/Layout";
import Content from "../components/Content";
import {map} from "react-bootstrap/ElementChildren";
import sendNotification from "../Notifications";

const ListItem = (props) => {
    const {user} = props;
    return <div>
        <div>{user.email}</div>
        <div>{user.firstname} {user.lastname}</div>
    </div>;
}
const TestFetch = () => {
    const [users, setUsers] = useState([])
    let children;

    children = {
        column:"Demo 1",
        // text_2:"Demo 2"
    };

    children.column = users.map((user) =>(
        <div className="d-flex bd-highlight">
            <Content>
                <ListItem key={user.id} user={user}/>
            </Content>
        </div>

        ))

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const res = await axios.get('/users')
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    },[])

    //For testing
    const notificationParams = {
        subject: "This is the subject",
        name: "This is name",
        message: "This is the message",
        to_address: "" //ADD EMAIL HERE
    }

    return (
                <div className="App">
                    <Layout>
                        {children}
                    </Layout>

                    <button onClick={() => sendNotification(notificationParams)}>
                        Test notification
                    </button>

                </div>
    );
};
export default TestFetch;