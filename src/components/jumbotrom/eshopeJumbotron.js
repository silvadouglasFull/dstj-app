import React from 'react'
import { Col, Row, Image, Card } from 'react-bootstrap'
import background_initial from '../../assets/img/background_initial.jpg'
const EshopeeJumbotron = () => {
    return <div className="jumbotron jumbotron-fluid mb-3">
        <div className="container-fluid" style={{ backgroundColor: '#FFF' }}>
            <Row className="d-flex align-items-center">
                <Col md={4} xs={12} className="p-5">
                    <h1 className="display-4">
                        DS TJ <i className="fas fa-laptop-code"></i>
                    </h1>
                    "Ame o PHP <i className="fas fa-heart"></i>"
                    <Card.Text>
                        <i className="text-secondary">Renan França</i>
                    </Card.Text>
                </Col>
                <Col md={8} xs={12}>
                    <Image src={background_initial}
                        style={{ maxHeight: 460, width: '100%', transform: 'scaleX(-1)' }} alt="jumbotron_img"></Image>
                </Col>
            </Row>
        </div>
    </div>
}
export default EshopeeJumbotron