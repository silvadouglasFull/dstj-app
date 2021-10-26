import React, { createContext, useState } from 'react'
import { useHistory } from 'react-router'
import { GET_ITENS, GET_CEP, POST_ITENS } from '../service/api'
export const storageContext = createContext()
const StorageContext = ({ children }) => {
    const [order, setOrdem] = useState(null)
    const [category, setCategory] = useState(null)
    const [data, setData] = useState(null)
    const [cart, setCart] = useState([{}])
    const [links, setLinks] = useState(null)
    const [prodFam, setProdFam] = useState(null)
    const [toast, setToast] = useState(false)
    const [cep, setCep] = useState(null)
    const [loading, setLoading] = useState(false)
    const [spinner, setSpnner] = useState(false)
    const [error, setError] = useState({
        error: '',
        variant: '',
    })
    const [frete, setFrete] = useState(null)
    const [code, setCode] = useState(null)
    const [os, setOS] = useState(null)
    const [db, setDb] = useState(null)
    const [cidade, setCidade] = useState(null)
    const { push } = useHistory()
    const getItens = async (state) => {
        const {
            uri,
            type
        } = state
        setSpnner(true)
        const { url, options } = GET_ITENS(uri)
        const response = await fetch(url, options)
        const json = await response.json()
        if (response.ok) {
            switch (type) {
                case 0:
                    setData(json.data)
                    setLinks(json.links)
                    // let newArray = json.data.reduce((unico, item) => {
                    //     return unico.includes(item.pf_descricao) ? unico : [...unico, item.pf_descricao]
                    // }, []);
                    // setProdFam(newArray)
                    break;
                case 1:
                    setData(json)
                    break;
                case 2:
                    setCategory(json)
                    break;
                case 3:
                    setData(json.data)
                    setLinks(json.links)
                    break;
                case 4:
                    setOrdem(json)
                    break;
                case 5:
                    setSpnner(false)
                    setFrete(json)
                    break;
                case 6:
                    setProdFam(json)
                    break;
                case 7:
                    setCart(json)
                    break;
                case 8:
                    setCidade(json)
                    break;
                default:
                    break;
            }
        } else {
            setError({
                error: json.msg,
                variant: 'danger'
            })
        }
        setSpnner(false)
    }
    const postItens = async (state) => {
        const {
            uri,
            formData,
            redirect,
            method,
        } = state
        setLoading(true)
        setError({
            error: 'Salvando dados',
            variant: 'warning'
        })
        const { url, options } = POST_ITENS(formData, uri, method)
        const response = await fetch(url, options)
        const json = await response.json()
        if (response.ok) {
            setError({
                error: json.msg,
                variant: 'success'
            })
            setLoading(false)
            if (redirect) {
                push(redirect)
                setCart([{}])
            }
        } else {
            setError({
                error: json.msg,
                variant: 'danger'
            })
            setLoading(false)
        }
        setLoading(false)
    }
    const getCep = async (state) => {
        setLoading(true)
        const { url, options } = GET_CEP(state)
        const response = await fetch(url, options)
        const json = await response.json()
        if (response.ok) {
            setLoading(false)
            const {
                ibge,
                logradouro,
                localidade,
                cep,
                bairro
            } = json
            getItens({
                uri: `/cidade/${ibge}`,
                type: 4
            })
            setCep({
                pes_bairro: bairro,
                pes_endereco: `${logradouro}, N°:`,
                pes_cidade: ibge,
                pes_cep: cep,
                cid_municipio: localidade,
            })
        } else {
            setCep({
                pes_endereco: 'CEP inválido'
            })
            setError({
                error: 'CEP inválido',
                variant: 'danger',
            })
            setLoading(false)
        }
    }
    const filterBy = (filter, word, result) => {
        result = data.filter((el) => {
            return el[filter].indexOf(word) > -1;
        })
        return setData(result)
    }
    const calcVol = async (state) => {
        const {
            uri,
            formData
        } = state
        const { url, options } = POST_ITENS(formData, uri, 'POST')
        const response = await fetch(url, options)
        const json = await response.json()
        if (response.ok) return setFrete(json)
        else return setError({
            error: json.msg,
            variant: 'warning',
        })
    }
    return <storageContext.Provider value={
        {
            order, setOrdem, data, setData, category, setCategory, cart, setCart, error, setError, links, setLinks,
            setProdFam, toast, setToast, cep, loading, setLoading, spinner, setSpnner,
            getItens, postItens, prodFam, getCep, filterBy, frete, setFrete, calcVol, code, setCode, os, setOS, db, setDb,
            cidade, setCidade
        }
    }>
        {children}
    </storageContext.Provider>
}
export default StorageContext