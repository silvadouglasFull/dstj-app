import React, { useReducer, createContext, useState } from 'react'
export const formContext = createContext()
const initialState = {
    pes_nome: "",
    pes_sobrenome: "",
    log_nome: '',
    log_senha: '',
    ps_senha: '',
    ps_pessoa: '',
    pes_codigo: '',
    pes_pessoa: '',
    pes_fantasia_: '',
    pes_cnpj: '',
    pes_ie: '',
    pes_imunicipal: '',
    pes_irural: '',
    pes_nascfunda: '',
    pes_endereco: '',
    pes_bairro: '',
    pes_cidade: '',
    pes_uf: '',
    pes_cep: '',
    pes_fone1: '',
    pes_fone2: '',
    pes_celular: '',
    pes_fax: '',
    pes_email: '',
    pes_cadastro: '',
    pes_contato: '',
    pes_pais: '',
    pes_observacao: '',
    pes_enquadramento: '',
    pes_tipocontribuinte: '',
    pes_segmento: '',
    pes_contacontabil: '',
    pes_complemento: '',
    pes_numero: '',
    pes_postal: '',
    pes_img: '',
    pes_termo: '',
    code_id: '',
    cod_desc: '',
    db_codigo: '',
    op_codigo: '',
}
const reducer = (state, { field, value }) => {
    return {
        ...state,
        [field]: value
    }
}
export const FormContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [modal, setModal] = useState(false)
    const [canvas, setCanvas] = useState(false)
    const onChange = ({ target }) => {
        dispatch({ field: target.name, value: target.value })

    }
    const onChangeSelect = ({ target }) => {
        const {
            code_id,
            cod_desc,
            op_codigo,
            op_desc,
            db_codigo,
            db_desc
        } = JSON.parse(target.value)
        switch (target.name) {
            case 'code_id':
                dispatch({ field: 'code_id', value: code_id })
                dispatch({ field: 'cod_desc', value: cod_desc })
                break;
            case 'op_codigo':
                dispatch({ field: 'op_codigo', value: op_codigo })
                dispatch({ field: 'op_desc', value: op_desc })
                break;
            case 'db_codigo':
                dispatch({ field: 'db_codigo', value: db_codigo })
                dispatch({ field: 'db_desc', value: db_desc })
                break;
            default:
                break;
        }
    }
    const onClick = async (field) => {
        try {
            Object.keys(field).map((key) => {
                return dispatch({ field: key, value: field[key] });
            })
        } catch (error) {
            console.error(error);
        }
    }
    const CEL = (value) => {
        value = String(value).replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        if (value.length > 15) {
            return CEL(value.substring(0, 15));
        } else {
            return value;
        }
    }
    const CEP = ({ target }) => {
        let d = target.value.replace(/\D/g, "")
        dispatch({ field: 'pes_cep', value: d.replace(/^(\d{5})(\d)/, "$1-$2") })

    }
    return (
        <formContext.Provider value={
            { state, dispatch, modal, setModal, canvas, setCanvas, onChange, CEL, CEP, onClick, onChangeSelect }
        }>
            {children}
        </formContext.Provider>
    )
}