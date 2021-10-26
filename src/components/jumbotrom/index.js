import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import background from '../../assets/img/background.jpeg'
const Jumbotron = ({ emp_fantasia, emp_capa }) => {
    return <div className="jumbotron jumbotron-fluid mb-3">
        <div className="container-fluid" style={{ backgroundColor: '#f6f6f6' }}>
            <Row className="d-flex align-items-center">
                <Col md={4} xs={12} className="p-5">
                    Bem vindo (a) a
                    <h1 className="display-4">{emp_fantasia}</h1>
                </Col>
                <Col md={8} xs={12}>
                    <Image src={emp_capa || background}
                        style={{ maxHeight: 460, width: '100%' }} alt="jumbotron_img"></Image>
                </Col>
            </Row>
        </div>
    </div>
}
export default Jumbotron