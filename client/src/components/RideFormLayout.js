import Navigation from './Navigation'
import Content from "./Content";
import "../stylesheets/style.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RideFormLayout = ({children}) => {
    return (
        <>
            <Navigation />
            <main>
                <Container fluid="mt-4" className="Container">
                    <Row>
                        <Col md="12">
                            <Content>
                                {children.column}
                            </Content>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default RideFormLayout
