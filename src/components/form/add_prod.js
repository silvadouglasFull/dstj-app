import React, { useState, useContext } from 'react'
import { InputGroup, Button, Form, Col } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const AddProd = () => {
    const [value, setValue] = useState(1)
    const [buttonText, setButtonText] = useState(' Adicionar ao carrinho')
    const { state } = useContext(formContext)
    const { cart, setCart } = useContext(storageContext)
    const handleProd = () => {
        const {
            PROD_CODIGO,
            PROD_DESCRICAO,
            PROD_PRECOVENDA,
            PROD_PROMOCAO,
            gal_path,
            pf_descricao,
            prod_empresa,
            pvp_observacao
        } = state
        // alert(JSON.stringify({
        //     PROD_CODIGO,
        //     PROD_DESCRICAO,
        //     PROD_PRECOVENDA,
        //     PROD_PROMOCAO,
        //     gal_path,
        //     pf_descricao,
        //     prod_empresa
        // }))
        Array.isArray(cart) ? setCart([...cart, {
            pvp_empresa: prod_empresa,
            pvp_produto: PROD_CODIGO,
            pvp_qtde: value,
            pvp_valorunit: PROD_PRECOVENDA,
            pvp_valortotal: value * PROD_PRECOVENDA,
            pvp_descricao: PROD_DESCRICAO,
            PROD_PROMOCAO,
            pvp_observacao: pvp_observacao ? pvp_observacao : 'Sem observações',
            gal_path,
            pf_descricao,

        }]) : setCart([{
            pvp_empresa: prod_empresa,
            pvp_produto: PROD_CODIGO,
            pvp_qtde: value,
            pvp_valorunit: PROD_PRECOVENDA,
            pvp_valortotal: value * PROD_PRECOVENDA,
            pvp_descricao: PROD_DESCRICAO,
            PROD_PROMOCAO,
            pvp_observacao: pvp_observacao ? pvp_observacao : 'Sem observações',
            gal_path,
            pf_descricao,

        }])
        setButtonText("Adicionado")
        // setToast(true)
    }
    return <div className="row">
        <Form.Group as={Col} md={3} xs={12} className="mb-3">
            <InputGroup>
                <InputGroup.Text onClick={() => setValue(value + 1)}>
                    <i className="fas fa-plus"></i>
                </InputGroup.Text>
                <Form.Control type="text" className="text-center" readOnly value={value} />
                <InputGroup.Text onClick={() => setValue(value === 1 ? 1 : value - 1)}>
                    <i className="fas fa-minus"></i>
                </InputGroup.Text>
            </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={9} xs={12} className="mb-3">
            <Button variant="secondary" className="w-100" onClick={handleProd}>
                {buttonText}
            </Button>
        </Form.Group>
    </div>
}
export default AddProd