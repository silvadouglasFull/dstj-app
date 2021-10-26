/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { ListGroup, Card, Col, Row, Badge, Spinner } from 'react-bootstrap'
import { storageContext } from '../../context/storageContext'
import { formContext } from '../../context/formContext'
// import FormAlert from '../alert/form_alert'
const OrderSList = () => {
    const { order, getItens, setOrdem, cart, setCart, postItens } = useContext(storageContext)
    const { state, onClick } = useContext(formContext)
    const {
        pes_codigo
    } = state
    useEffect(() => {
        setOrdem(null)
        setCart(false)
        pes_codigo && getItens({
            uri: `/pedido_venda/1/${pes_codigo}`,
            type: 4
        })
    }, [pes_codigo])
    // const items = [
    //     {
    //         loja: "💎 Joias prata", pedido: {
    //             id: '#12608',
    //             frete: 0,
    //             total: 0,
    //             entrega: 'Rua Anibal Papes de barros',
    //             produtos: [
    //                 { id: 1, prod_desc: 'Anel de Prata - 51594', qtd: 1, total: 0 }
    //             ]
    //         }
    //     },
    // ]
    const handleClick = (item, args) => {
        if (args === 1) {
            setCart(!cart)
            onClick(item)
        } else {
            if (window.confirm('Você deseja confirmar recebimento do seu pedido')) {
                const {
                    emp_codigo,
                    pv_numero
                } = item
                const formData = new FormData()
                formData.append('pv_status', 5)
                formData.append('emp_codigo', emp_codigo)
                formData.append('pv_numero', pv_numero)
                postItens({
                    uri: `/pedido_venda/ped/${pv_numero}`,
                    method: 'POST',
                    formData,
                    reflow: `/pedido_venda/1/${pes_codigo}`,
                    type: 4
                })
            }
        }
    }
    return (<ListGroup>
        {order ?
            // order.map((item, i) => (
            Object.keys(order).map((key, i) => (
                <ListGroup.Item action key={i} className="mb-3">
                    <Row>
                        <Col md={8} xs={8}>
                            <Card.Title className="display-6">
                                <i className="fas fa-store-alt me-2"></i>{order[key]['pv_produtos'][0].emp_fantasia}
                            </Card.Title>
                        </Col>
                        <Col md={4} xs={4}>
                            <Card.Title className="display-6">
                                R${order[key]['pv_produtos'][0].pv_total_produto}
                            </Card.Title>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="mb-3">
                        <Col md={8} xs={6}>
                            <Card.Text className="fw-bold text-secondary">Produtos</Card.Text>
                        </Col>
                        {order[key]['pv_produtos'][0].pv_status === '1' &&
                            <Col md={4} xs={6}>
                                <Badge bg="secondary">Aguardando aprovação</Badge>
                            </Col>
                        }
                        {order[key]['pv_produtos'][0].pv_status === '2' &&
                            <Col md={4} xs={6}>
                                <Badge bg="warning">Aprovado</Badge>
                            </Col>
                        }
                        {/* <i className="fas fa-plane-departure"></i></span> */}
                        {order[key]['pv_produtos'][0].pv_status === '3' &&
                            <Col md={4} xs={6}>
                                <Badge bg="danger">Recusado</Badge>
                            </Col>
                        }
                        {order[key]['pv_produtos'][0].pv_status === '4' &&
                            <Col md={4} xs={12}>
                                <Badge bg="primary" className="me-3">Produto enviado <i className="fas fa-plane-departure"></i></Badge>
                                <Badge bg="success" onClick={() => handleClick(order[key]['pv_produtos'][0], 2)}>Confirmar recebimento
                                    <i className="fas fa-plane-arrival" style={{ transform: 'scaleX(-1)' }}></i></Badge>
                            </Col>
                        }
                        {order[key]['pv_produtos'][0].pv_status === '5' &&
                            <Col md={4} xs={6}>
                                <Badge bg="success">Produto recebido</Badge>
                            </Col>
                        }
                    </Row>
                    {order[key]['pv_produtos'].map(item => (
                        <Row key={item.pvp_produto} className="mb-3">
                            <Col md={8} xs={8}>
                                <Card.Text className="fw-bold">
                                    {item.pvp_qtde} x {item.PROD_DESCRICAO}
                                </Card.Text>
                            </Col>
                            <Col md={4} xs={4}>
                                <Card.Text className="fw-bold text-secondary">
                                    R$ {item.pvp_qtde * item.pvp_valorunit}
                                </Card.Text>
                            </Col>
                        </Row>
                    ))}
                    <Row className="mb-3">
                        <Col md={4} xs={12}>
                            <Card.Text className="fw-bold text-secondary">
                                Entregar em
                            </Card.Text>
                        </Col>
                        <Col md={8} xs={12}>
                            <Card.Text>
                                {order[key]['pv_produtos'][0].pv_enderecocliente}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={3} xs={6}>
                            <Card.Text className="fw-bold text-secondary">
                                Frete
                            </Card.Text>
                        </Col>
                        <Col md={3} xs={6}>
                            <Card.Text>
                                R$ {order[key]['pv_produtos'][0].pv_frete && parseFloat(order[key]['pv_produtos'][0].pv_frete).toFixed(2)}
                            </Card.Text>
                        </Col>
                        <Col md={3} xs={6}>
                            <Card.Text className="fw-bold text-secondary">
                                Forma pagamento
                            </Card.Text>
                        </Col>
                        <Col md={3} xs={6}>
                            <Card.Text>
                                <Badge bg="danger">{order[key]['pv_produtos'][0].cond_descricao}</Badge>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        {order[key]['pv_produtos'][0].pv_path_comp ?
                            <Col>
                                <Card.Text className="text-primary">
                                    Ver comprovante
                                </Card.Text>
                            </Col>
                            :
                            <Col onClick={() => handleClick(order[key]['pv_produtos'][0], 1)} >
                                <Card.Text className="text-primary">
                                    Adicionar comprovante de pagamento
                                </Card.Text>
                            </Col>
                        }
                    </Row>
                </ListGroup.Item >
            ))
            :
            <Spinner animation="grow" />
        }
    </ListGroup >)
}
export default OrderSList