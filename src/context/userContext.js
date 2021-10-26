import { createContext, useState } from 'react'
import React from 'react'
import { useHistory } from 'react-router'
import { POST_ITENS } from '../service/api'
export const userContext = createContext()
export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [access, setAccess] = useState(false)
    const [error, setError] = useState(false)
    const [login, setLogin] = useState(false)
    const [load, setLoad] = useState(false)
    const { push } = useHistory()
    const onLogin = async (state) => {
        const {
            uri,
            redirect,
            formData
        } = state
        setLoad(true)
        const { url, options } = POST_ITENS(formData, uri, 'POST')
        const response = await fetch(url, options)
        const json = await response.json()
        if (response.ok) {
            setAccess(true)
            setUser(json)
            setLogin(false)
            setLoad(false)
            push(redirect)
        } else {
            setError({
                error: json.msg,
                variant: 'danger',
            })
            setLoad(false)
            setAccess(false)
        }
    }
    const onLogount = () => {
        window.location.reload(true)
    }
    return (
        <userContext.Provider value={{
            user, setUser, access, error, setError, login, setLogin, setAccess, load, setLoad, onLogin, onLogount,
        }}>{children}</userContext.Provider>
    )
}