import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
const AcctionsNavtabs = () => {
    const { canvas, setCanvas } = useContext(formContext)
    return <Nav className="justify-content-center" activeKey="#">
        <Nav.Item>
            <Nav.Link href="#" onClick={() => setCanvas(!canvas)}>Categorias</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1">Ordenar</Nav.Link>
        </Nav.Item>
    </Nav>
}
export default AcctionsNavtabs