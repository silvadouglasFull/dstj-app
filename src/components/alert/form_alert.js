import React, { useContext } from 'react'
import { Col, Row, Alert } from 'react-bootstrap'
import { storageContext } from '../../context/storageContext'
const FormAlert = () => {
    const { error ,setError} = useContext(storageContext)
    return error &&
        <Alert variant={error.variant}>
            <Row>
                <Col md={8} xs={8}>
                    {error.error}
                </Col>
                <Col md={4} xs={4}>
                    <i className="far fa-times-circle" onClick={()=>setError(null)}></i>
                </Col>
            </Row>
        </Alert>
}
export default FormAlert