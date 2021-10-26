import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import FormAlert from '../alert/form_alert'
import UserAlert from '../alert/user_alert'
import UserForm from '../form/user'
const UserModal = () => {
    const { login, setLogin } = useContext(userContext)
    return <Modal
        size="lg"
        show={login}
        onHide={() => setLogin(!login)}
        aria-labelledby="example-modal-sizes-title-lg"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Fazer login
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <UserAlert />
            <FormAlert />
            <UserForm />
        </Modal.Body>
        <Modal.Footer>
            <Link to="/account" onClick={() => setLogin(!login)} className="text-decoration-none">
                Criar conta
            </Link>
        </Modal.Footer>
    </Modal>
}
export default UserModal