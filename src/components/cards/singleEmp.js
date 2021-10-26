import React, { useContext } from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import background_initial_cart from '../../assets/img/background_initial_cart.jpeg'
const SingleEmp = ({ item }) => {
    const { onClick, setModal, modal } = useContext(formContext)
    const handleLink = (emp) => {
        onClick(emp)
        setModal(!modal)
    }
    return <Col xs={12}>
        <Card className="text-center m-3">
            <Card.Img variant="top" src={item.pes_img ? `https://eshopee.com.br/api${item.pes_img}` : background_initial_cart}
                style={{ maxHeight: 350 }} className="w-100 rounded" />
            <Card.Body>
                <hr />
                <Card.Title className="mb-3">
                    {item.pes_nome} {item.pes_fantasia}
                </Card.Title>
                <Card.Text>
                    <i className="fas fa-code"></i> {item.cod_desc}
                </Card.Text>
                <Card.Text>
                    <i className="fas fa-database"></i>  {item.db_desc}
                </Card.Text>
                <Card.Text>
                    <i className="fas fa-laptop"></i> {item.op_desc}
                </Card.Text>
                <Card.Text>
                    <i className="text-secondary">{item.pes_pes_complemento}</i>
                </Card.Text>
                <Button variant="outline-secondary" className="w-100" onClick={() => handleLink(item)}>
                    Ver perfil
                </Button>
            </Card.Body>
        </Card>
    </Col>
}
export default SingleEmp