/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const CategoriaList = () => {
    const { category, getItens, setData } = useContext(storageContext)
    const { dispatch, state, canvas, setCanvas } = useContext(formContext)
    const {
        emp_codigo
    } = state
    useEffect(() => {

    }, [])
    useEffect(() => {
        getItens({
            uri: '/produto_familia',
            type: 2
        })
    }, [])
    const handleCatProd = (item) => {
        // push(pf_descricao)
        setData(null)
        dispatch({ field: 'pf_descricao', value: item.pf_descricao })
        getItens({
            uri: `/produto/${emp_codigo}/${item.pf_codigo}`,
            type: 3
        })
        setCanvas(!canvas)
    }
    return <ListGroup variant="flush">
        {Array.isArray(category) ?
            category.map(item => (
                <ListGroup.Item key={item.pf_codigo} onClick={() => handleCatProd(item)} action>
                    {item.pf_descricao}
                </ListGroup.Item>
            ))
            :
            <Spinner animation="grow" />
        }
    </ListGroup >
}
export default CategoriaList