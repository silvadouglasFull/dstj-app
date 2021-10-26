import React, { useContext } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import CategoriaList from '../list/category_list'
const CategoryOffcanvas = () => {
    const { canvas, setCanvas } = useContext(formContext)
    return <Offcanvas show={canvas} onHide={() => setCanvas(!canvas)}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Categorias</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <CategoriaList />
        </Offcanvas.Body>
    </Offcanvas>
}
export default CategoryOffcanvas