/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import { Container, Card } from 'react-bootstrap'
import FormAlert from '../components/alert/form_alert'
import ProfileForm from '../components/form/profile_data'
import ContractModal from '../components/modal/modal_contract'
import { storageContext } from '../context/storageContext'
import { userContext } from '../context/userContext'
import { formContext } from '../context/formContext'
const Account = () => {
    const { setLogin } = useContext(userContext)
    const { getItens } = useContext(storageContext)
    const { setModal } = useContext(formContext)
    useEffect(() => {
        setLogin(false)
        setModal(false)
        getItens({
            uri: '/code',
            type: 2,
        })
        getItens({
            uri: '/os',
            type: 4,
        })
        getItens({
            uri: '/dbs',
            type: 7,
        })
    }, [])
    return <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Card.Body>
            <Card.Title>
                Criar conta na  DS TJ <i className="fas fa-laptop-code"></i>
            </Card.Title>
            <FormAlert />
            <ProfileForm />
        </Card.Body>
        <ContractModal />
    </Container>
}
export default Account