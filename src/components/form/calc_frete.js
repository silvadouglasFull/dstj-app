/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Form, InputGroup, Spinner } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
const CalcFrete = () => {
    const { state, CEP } = useContext(formContext)
    const { getItens, spinner } = useContext(storageContext)
    const {
        pes_cep,
        PROD_CODIGO,
        emp_cep
    } = state
    useEffect(() => {
        pes_cep && onClick()
    }, [])
    const onClick = () => {
        // /calcfrete/{prod_codigo}/{sCepOrigem}/{sCepDestino}/{nCdServico}
        pes_cep && getItens({
            uri: `/transporte/calcfrete/${PROD_CODIGO}/${emp_cep}/${pes_cep.replace("-", "")}`,
            type: 5
        })
    }
    return <Form.Group>
        <InputGroup>
            <Form.Control type="text" name="pes_cep" value={pes_cep} onChange={CEP} placeholder="13615-000"
                maxLength={9} />
            <InputGroup.Text onClick={onClick}>
                {spinner && pes_cep ? <Spinner animation="grow" size="sm" /> :
                    <i className="fas fa-truck"></i>
                }
            </InputGroup.Text>
        </InputGroup>
    </Form.Group>
}
export default CalcFrete