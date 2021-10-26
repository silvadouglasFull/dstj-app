import React, { useContext } from 'react'
import { Col, Form } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
const ProdObs = () => {
    const { onChange, state } = useContext(formContext)
    const {
        pvp_observacao
    } = state
    return <Form.Group controlId="pvp_observacao" className="m-3" as={Col} md={12} xs={12}>
        <Form.Label>Observação sobre esse item</Form.Label>
        <Form.Control as="textarea" name="pvp_observacao" value={pvp_observacao} onChange={onChange}
            placeholder="Coloque aqui uma observação para o vendedor ver sobre esse produto">
            {pvp_observacao}
        </Form.Control>
    </Form.Group>
}
export default ProdObs