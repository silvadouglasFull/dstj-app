import React, { useContext } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const ProfileModal = () => {
    const { modal, setModal, state } = useContext(formContext)
    const { setFrete } = useContext(storageContext)
    const {
        pes_nome,
        pes_celular,
        pes_email,
        pes_fantasia,
        cid_nome,
        pes_uf,
        op_desc,
        db_desc,
        cod_desc
    } = state
    return <Modal
        size="lg"
        show={modal}
        onHide={() => {
            setModal(!modal)
            setFrete(null)
        }}
        aria-labelledby="example-modal-sizes-title-lg"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                {pes_nome} {pes_fantasia}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={12} xs={12} className="mb-3">
                    <h6 className="fw-bold">Informações de contato</h6>
                </Col>
                <Col md={6} xs={12} className="mb-3" onClick={() => window.location.href = `https://wa.me/55${pes_celular}`} style={{ cursor: 'pointer' }}>
                    <i class="fab fa-whatsapp"></i> {pes_celular}
                </Col>
                <Col md={6} xs={12} className="mb-3" onClick={() => window.location.href = `mailto:${pes_email}`} style={{ cursor: 'pointer' }}>
                    <i class="far fa-envelope"></i> {pes_email}
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    Informações localidade
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    <i class="fas fa-map-marker-alt"></i> {cid_nome} {pes_uf && pes_uf.toUpperCase()}
                </Col>
            </Row>
            <Row>
                <Col md={12} xs={12} className="mb-3">
                    <h6 className="fw-bold">Linguagens de programação</h6>
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    {cod_desc}
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    <h6 className="fw-bold">Sistemas operacionais</h6>
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    {op_desc}
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    <h6 className="fw-bold">Banco de Dados</h6>
                </Col>
                <Col md={12} xs={12} className="mb-3">
                    {db_desc}
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
}
export default ProfileModal