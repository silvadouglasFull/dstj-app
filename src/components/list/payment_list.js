/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const Paymentist = () => {
    const [payment, setPayment] = useState(false)
    const { dispatch, state } = useContext(formContext)
    const { getItens, category } = useContext(storageContext)
    const {
        emp_codigo,
    } = state
    // const items = [
    //     { text: "Pix" },
    //     { text: "Boleto" },
    //     { text: "TED/DOC" },
    // ]
    useEffect(() => {
        emp_codigo && getItens({
            uri: `/cond_pag/${emp_codigo}`,
            type: 2
        })
    }, [])
    const onClick = (item) => {
        setPayment(item.cond_codigo)
        dispatch({ field: 'pv_condicaopagamento', value: item.cond_codigo })
    }
    return (<ListGroup horizontal>
        {Array.isArray(category) ? category.map(item => (
            <ListGroup.Item action onClick={() => onClick(item)}>
                    {item.cond_descricao} {payment === item.cond_codigo && <i className="fas fa-check"></i>}
                    <p>{item.cond_info}</p>
            </ListGroup.Item>
        ))
            :
            <Spinner animation="grow" size="sm" />
        }
    </ListGroup>)
}
export default Paymentist