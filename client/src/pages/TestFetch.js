import axios from "axios";
import {useEffect} from "react"
import {useState} from "react"
import Navigation from "../components/Navigation";
import Content from "../components/Content";
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

    //For testing
    const notificationParams = {
        subject: "This is the subject",
        name: "This is name",
        message: "This is the message",
        to_address: "" //ADD EMAIL HERE
    }

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
    return (
                <div className="App">
                    <Navigation/>
                        {users.map((user) =>(
                            <Content>
                                <ListItem key={user.id} user={user}/>
                            </Content>
                        ))}
                    
                    <button onClick={() => sendNotification(notificationParams)}>
                        Test notification
                    </button>

                </div>
    );
};
export default TestFetch;