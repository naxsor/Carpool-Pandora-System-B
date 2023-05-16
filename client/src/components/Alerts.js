import {useState} from "react";
import {Alert} from "react-bootstrap";

const CustomAlert = ({children}) => {
    const [show, changeShow] = useState(false);
    return (
        <Alert variant={children.variant} show={children.show} onClose={() => changeShow(false)} >{children.message}</Alert>
    )
}

export default CustomAlert
// export const SuccessAlert = ({children}) => {
//     const [show, changeShow] = useState(false);
//     return (
//         <Alert variant="success" show={children.showsuccess} onClose={() => changeShow(false)} >{children.message}</Alert>
//     )
// }
