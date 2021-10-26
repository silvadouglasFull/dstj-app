import React, { useContext, useState } from "react";
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap'
import { formContext } from "../../context/formContext";
import { storageContext } from "../../context/storageContext";
import { userContext } from "../../context/userContext";
const UserForm = () => {
    const [type, setType] = useState("password")
    const [validated, setValidated] = useState(false);
    const { onChange, state } = useContext(formContext)
    const { load, onLogin } = useContext(userContext)
    const { setError } = useContext(storageContext)
    const {
        ps_senha,
        ps_pessoa
    } = state
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setError(null)
        const formData = new FormData()
        formData.append("ps_pessoa", ps_pessoa)
        formData.append("ps_senha", ps_senha)
        onLogin(
            {
                uri: '/pessoa/auth',
                formData,
                redirect: window.localStorage.getItem("pathname") ? window.localStorage.getItem("pathname") : '/profile'
            }
        )
        setValidated(true);
    };
    return <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" requerid
                placeholder="meuemail@email.com" name="ps_pessoa" value={ps_pessoa} onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <InputGroup>
                <Form.Control type={type} requerid
                    placeholder="*****" name="ps_senha" value={ps_senha} onChange={onChange} />
                <InputGroup.Text onClick={() => setType(type === "password" ? "text" : "password")}>
                    {type === "password" ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                </InputGroup.Text>
            </InputGroup>
        </Form.Group>
        <Button className="w-100" variant="dark" type="submit">
            {load ? <Spinner animation="grow" />
                :
                <span>
                    Entrar{' '}<i className="fas fa-sign-in-alt"></i>
                </span>
            }
        </Button>
    </Form>
}
export default UserForm