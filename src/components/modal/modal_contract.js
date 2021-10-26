import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { userContext } from '../../context/userContext'
import Contract from '../form/contract'
const ContractModal = () => {
    const { login, setLogin } = useContext(userContext)
    return <Modal
        size="lg"
        show={login}
        onHide={() => setLogin(!login)}
        aria-labelledby="example-modal-sizes-title-lg"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
            DS TJ <i className="fas fa-laptop-code"></i>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Contract />
        </Modal.Body>
    </Modal>
}
export default ContractModal