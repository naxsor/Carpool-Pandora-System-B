import axios from "axios";
import {useEffect} from "react"
import {useState} from "react"
import Navigation from "../components/Navigation";
import Layout from "../components/Layout";
import Content from "../components/Content";
import {map} from "react-bootstrap/ElementChildren";

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

    return (
                <div className="App">
                    <Layout>
                        {children}
                    </Layout>
                </div>
    );
};
export default TestFetch;