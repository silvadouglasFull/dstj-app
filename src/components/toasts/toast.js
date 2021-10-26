import React, { useContext } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import { storageContext } from '../../context/storageContext'
import { formContext } from '../../context/formContext'
const ToastInfo = () => {
    const { toast, setToast } = useContext(storageContext)
    const { state } = useContext(formContext)
    const {
        emp_fantasia
    } = state
    return <ToastContainer className="p-3" position='bottom-center'>
        <Toast show={toast} onClose={() => setToast(!toast)}>
            <Toast.Header closeButton={true}>
                <i className="fas fa-store-alt me-2"></i>
                <strong className="me-auto">{emp_fantasia}</strong>
            </Toast.Header>
            <Toast.Body>
                Produto adicionado ao carrinho
            </Toast.Body>
        </Toast>
    </ToastContainer>
}
export default ToastInfo