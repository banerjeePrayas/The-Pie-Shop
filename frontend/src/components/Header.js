/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';  //Alternative of React-Router for Bootstrap
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox'
// rafce --> React arrow Functional component export
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions';

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar  style={{ backgroundColor: 'teal' }} variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>The Pie-Shop <i class="fas fa-pizza-slice" style={{ color: 'yellow' }}></i></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to='/blogs'  style={{ color: 'white' }}>
                                <Nav.Link><i class="fab fa-blogger"></i> Blogs</Nav.Link>
                            </LinkContainer>
                            { cartItems.length !== 0 ? 
                                <LinkContainer to='/cart'  style={{ color: 'lime' }}>
                                <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                                </LinkContainer> :
                                <LinkContainer to='/cart' style={{ color: 'red' }}>
                                <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                                </LinkContainer>
                            }
                            


                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Log-Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link> <i className="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>
                            )}

                            { userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productList'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderList'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/bloglist'>
                                        <NavDropdown.Item>Blogs</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
