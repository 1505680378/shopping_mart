import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../../Style.css'
import { useSelector } from 'react-redux';

function NavigationBar() {
    const selector = useSelector((State) => State.product.cartItem)
    return (
        <Navbar expand="lg" fixed="top" className=" custom-navbar">
            <Container>
                <Navbar.Brand href="/" className='logo'>Shoping Mart</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/' className='link'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/cart' className='link'>Cart</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {
                            selector.length > 0 && (
                                <Nav.Link as={Link} to='/cart' className='link cart-text'>Cart <sup><span className='navbar-cart-value'>{selector.length}</span></sup></Nav.Link>
                            )
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;