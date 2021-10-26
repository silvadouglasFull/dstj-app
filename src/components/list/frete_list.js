/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const Fretelist = () => {
    const [payment, setPayment] = useState(false)
    const { onClick } = useContext(formContext)
    const { frete } = useContext(storageContext)
    useEffect(() => {
        Array.isArray(frete) && onClick(frete[0]) && setPayment(frete[0].cor_desc)
    }, [frete])
    // const items = [
    //     { text: "Pix" },
    //     { text: "Boleto" },
    //     { text: "TED/DOC" },
    // ]
    const handleClick = (item) => {
        setPayment(item.cor_desc)
        onClick(item)
    }
    return (<ListGroup>
        {Array.isArray(frete) ? frete.map(item => (
            item.pv_frete > 0 &&
            < ListGroup.Item action onClick={() => handleClick(item)}>
                R${parseFloat(item.pv_frete).toFixed(2)} - {item.cor_desc} em {item.pv_prazo} {item.pv_prazo > 1 ? 'dias' : 'dia'} {payment === item.cor_desc && <i className="fas fa-check"></i>}
            </ListGroup.Item>
        ))
            :
            <Spinner animation="grow" size="sm" />
        }
    </ListGroup >)
}
export default Fretelist