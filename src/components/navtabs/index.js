/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Nav, Container } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const Navtabs = () => {
    const { push } = useHistory()
    const { dispatch, onClick, setCanvas, canvas, state } = useContext(formContext)
    const { links, getItens, setLinks, setData } = useContext(storageContext)
    useEffect(() => {
        // filterBy, prodFam,
        dispatch({ field: 'pf_descricao', value: 'todos os produtos' })
    }, [])
    const {
        emp_codigo
    } = state
    const handleProdFam = () => {
        // push(pf_descricao)
        dispatch({ field: 'pf_descricao', value: 'todos os produtos' })
        // filterBy('pf_descricao', pf_descricao)
        getItens({
            uri: `/produto/${emp_codigo}/0`,
            type: 0
        })
    }
    const handlePage = (i) => {
        getItens({
            uri: `/produto/12/0?page=${i}`,
            type: 0
        })
    }
    return <Container fluid>
        <Nav as="ul" className="justify-content-center">
            {/* {Array.isArray(prodFam) &&
                prodFam.map(item => (
                    <Nav.Item as="li" key={item}>
                        <Nav.Link onClick={() => handleProdFam(item)}>{item.toUpperCase()}</Nav.Link>
                    </Nav.Item>
                ))} */}
            <Nav.Item>
                <Nav.Link onClick={handleProdFam}>
                    Todos os produtos
                </Nav.Link>
            </Nav.Item>
            {Array.isArray(links) &&
                links.map((item, i) => (
                    <Nav.Item as="li" key={item.label}>
                        <Nav.Link disabled={item.active} onClick={() => handlePage(i)}>
                            {item.label === "pagination.previous" && <i className="fas fa-arrow-left"></i>}
                            {item.label === "pagination.next" && <i className="fas fa-arrow-right"></i>}
                            {item.label !== "pagination.previous" && item.label !== "pagination.next" && item.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            <Nav.Item>
                <Nav.Link href="#" onClick={() => setCanvas(!canvas)}>Categorias</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => {
                    push('/')
                    onClick({
                        emp_fantasia: null,
                        emp_pop: '',
                        emp_codigo: '',
                    })
                    setData(null)
                    setLinks(null)
                    window.localStorage.clear()
                }}>
                    Ver todas as lojas
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </Container>
}
export default Navtabs