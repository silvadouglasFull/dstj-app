/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import { Form, Button, Row, Col, Image, Spinner } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const OrderForm = () => {
    const [preview, setPreview] = useState(null)
    const [validated, setValidated] = useState(false)
    const { state, onChange } = useContext(formContext)
    const { setError, postItens, loading, setLoading } = useContext(storageContext)
    const {
        pv_observacao,
        pv_numero
    } = state
    useEffect(() => {
        setLoading(false)
    }, [])
    const onSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        window.scrollTo(0, 0)
        if (form.checkValidity() === false) {
            return setError({
                error: 'Você precisa anexar uma foto do comprovante e colocar uma observação',
                variant: 'warning'
            })
        }
        const formData = new FormData()
        formData.append('pv_path_comp', preview.raw)
        formData.append('pv_observacao', pv_observacao)
        postItens({
            uri: `/pedido_venda/attach/${pv_numero}`,
            method: 'POST',
            formData
        })
        setValidated(true);
    }
    const onChangeImage = ({ target }) => {
        target.files[0] && setPreview({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0]
        })
    }
    //<i class="fas fa-paperclip"></i>
    return <Form noValidate validated={validated} onSubmit={onSubmit} >
        <Row>
            {preview ?
                <Col md={12} xs={12} className="text-center">
                    <Image src={preview.preview} alt="preview" className="mb-3" style={{ maxHeight: 320 }} />
                    <Col>
                        <Button variant="outline-dark" className="mb-3" onClick={() => setPreview(null)}>
                            Remover comprovante
                        </Button>
                    </Col>
                </Col>
                :
                <Col md={12} xs={12} className="text-center">
                    <Col md={12} xs={12} className="mb-3">
                        <i className="fas fa-paperclip fa-4x" onClick={() => {
                            const button = document.getElementById('pv_comprovante')
                            button.click()
                        }}></i>
                    </Col>
                    <Col>
                        <Form.Label>Anexar comprovante de pagamento</Form.Label>
                    </Col>
                </Col>
            }
            <Form.Group controlId="pv_comprovante" as={Col} md={12} xs={12} className="d-none d-md-none d-lg-none">
                <Form.Label>Anexar comprovante</Form.Label>
                <Form.Control type="file" name="pv_comprovante" required onChange={onChangeImage} />
            </Form.Group>
            <Form.Group controlId="pv_observacao" as={Col} md={12} xs={12} className="mb-3">
                <Form.Label className="text-center">Observação sobre o seu comprovante de pagamento</Form.Label>
                <Form.Control type="text" name="pv_observacao" value={pv_observacao} required onChange={onChange}
                    maxLength={100} />
            </Form.Group>
            <Col md={12} xs={12}>
                <Button variant="dark" type="submit">
                    {loading ?
                        <Spinner animation="grow" size="sm" />
                        :
                        <span>
                            Enviar comprovante <i className="fas fa-paper-plane"></i>
                        </span>
                    }
                </Button>
            </Col>
        </Row >
    </Form >
}
export default OrderForm