/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import ProfileForm from '../components/form/profile_data'
import { userContext } from '../context/userContext'
import { formContext } from '../context/formContext'
import { storageContext } from '../context/storageContext'
const Profile = () => {
    const { user } = useContext(userContext)
    const { onClick } = useContext(formContext)
    const {setData} = useContext(storageContext)
    useEffect(() => {
        setData(null)
        user && onClick(user)
    }, [user])
    return <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Card.Body>
            <Card.Title>
                Meu Perfil
            </Card.Title>
            <ProfileForm />
        </Card.Body>
    </Container>
}
export default Profile