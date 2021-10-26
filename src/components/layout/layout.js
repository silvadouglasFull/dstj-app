import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { userContext } from '../../context/userContext'
import { formContext } from '../../context/formContext'
import UserModal from '../modal/user_modal'
import { storageContext } from '../../context/storageContext'
const Layout = ({ children }) => {
    const { setLogin, access } = useContext(userContext)
    const { state } = useContext(formContext)
    const { setError, getItens } = useContext(storageContext)
    const {
        emp_fantasia,
        emp_pop
    } = state
    const { push } = useHistory()
    const handleClick = () => {
        setError(null)
        !access ? setLogin(true) : push('/profile')
    }
    return <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                {emp_fantasia ?
                    <Navbar.Brand onClick={() => push(`/shop/${emp_pop}`)}>
                        <i className="fas fa-laptop-code"></i>{emp_fantasia}
                    </Navbar.Brand>
                    :
                    <Navbar.Brand onClick={() => push('/')}>
                        DS TJ <i className="fas fa-laptop-code"></i>
                    </Navbar.Brand>
                }

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => getItens({
                            uri: `/pessoa`,
                            type: 1,
                        })}>Todos os dev's</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#" onClick={handleClick}><i className="far fa-user"></i></Nav.Link>
                        {/* <Nav.Link eventKey={2} onClick={() => {
                            push('/cart')
                            window.localStorage.setItem('pathname', '/cart')
                        }
                        }>
                            <i className="fas fa-shopping-cart"></i>
                        </Nav.Link> */}
                        {access &&
                            <Nav.Link href="http://localhost:3000">
                                <i className="fas fa-sign-out-alt"></i>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <UserModal />
        {children}
    </>
}
export default Layout