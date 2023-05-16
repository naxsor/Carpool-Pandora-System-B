import Navigation from './Navigation'
import Content from "./Content";
import "../stylesheets/style.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = ({children}) => {
    return (
        <>
            <Navigation />
            <main>
            <Container fluid="mt-4" className="Container">
                <Row>
                    <Col md="8">
                        {/*<Content>*/}
                            {children.column}
                        {/*</Content>*/}
                    </Col>
                    <Col md="4">
                        <Content>
                            Side Bar
                        </Content>
                    </Col>
                </Row>
            </Container>
            </main>

            {/*<main>{children}</main>*/}
            {/*<Footer />*/}
        </>
    )
}

export default Layout
