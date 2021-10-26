/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Form, InputGroup, Col, Spinner } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const Address = () => {
    const { state, onChange, onClick } = useContext(formContext)
    const { loading, cep, getCep, getItens, data } = useContext(storageContext)
    const {
        pes_cep,
        pes_endereco,
        pes_numero,
        pes_uf,
        pes_bairro,
        pes_cidade
    } = state
    useEffect(() => (
        cep && onClick(cep)
    ), [cep, onClick])
    useEffect(() => {
        pes_cidade && getItens({
            uri: `/cidade/${pes_cidade}`,
            type: 1
        })
    }, [cep])
    return <div className="row">
        <Form.Group controlId="pes_cep" className="mb-3" as={Col} md={12} xs={12}>
            <Form.Label>CEP</Form.Label>
            <InputGroup>
                <Form.Control type="text" name="pes_cep" value={pes_cep} onChange={onChange}
                    placeholder="00000-000" />
                <InputGroup.Text onClick={() => getCep(pes_cep)}>
                    {loading ? <Spinner animation="grow" size="sm" /> :
                        <i className="fa fa-search"></i>
                    }
                </InputGroup.Text>
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="pes_endereco" className="mb-3" as={Col} md={8} xs={8}>
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" name="pes_endereco" value={pes_endereco} onChange={onChange}
                placeholder="Endereço de entrega" />
        </Form.Group>
        <Form.Group controlId="pes_numero" as={Col} md={4} xs={4}>
            <Form.Label>N°</Form.Label>
            <Form.Control type="text" name="pes_numero" value={pes_numero} onChange={onChange}
                placeholder="00" />
        </Form.Group>
        <Form.Group controlId="pes_bairro" className="mb-3" as={Col} md={12} xs={12}>
            <Form.Label>Bairro</Form.Label>
            <Form.Control type="text" name="pes_bairro" value={pes_bairro} onChange={onChange}
                placeholder="Bairro de entrega" />
        </Form.Group>
        <Form.Group controlId="cid_nome" className="mb-3" as={Col} md={8} xs={8}>
            <Form.Label>Cidade</Form.Label>
            <Form.Control as="select" name="pes_cidade" value={pes_cidade} onChange={onChange}>
                {Array.isArray(data) && data.map(item => (
                    <option value={item.cid_codibge}>
                        {item.cid_nome}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md={4} xs={12} className="mb-3">
            <Form.Label>Meu UF</Form.Label>
            <Form.Control as="select" name="pes_uf" value={pes_uf} onChange={onChange}>
                {Array.isArray(data) && data.map(item => (
                    <option value={item.cid_uf}>
                        {item.cid_uf}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    </div>
}
export default Address