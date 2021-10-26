/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap'
import { formContext } from '../../context/formContext'
import { storageContext } from '../../context/storageContext'
// import { userContext } from '../../context/userContext'
const ProfileForm = () => {
    const [validated, setValidated] = useState(false)
    const [preview, setPreview] = useState(null)
    const [type, setType] = useState("password")
    // const { setLogin, login } = useContext(userContext)
    const { state, onChange, onClick, onChangeSelect } = useContext(formContext)
    const { getItens, order, cep, postItens, setError, category, code, os, db,
        setCode, setOS, setDb, cart, cidade, setCidade } = useContext(storageContext)
    const location = useLocation()
    const { pathname } = location
    const {
        pes_codigo,
        cid_nome,
        pes_bairro,
        pes_celular,
        // pes_cep,
        pes_cidade,
        pes_email,
        pes_complemento,
        pes_fantasia,
        pes_img,
        pes_nome,
        // pes_numero,
        pes_uf,
        // pes_termo,
        ps_senha,
        code_id,
        db_codigo,
        db_desc,
        op_codigo,
        op_desc,
        cod_desc
    } = state
    useEffect(() => {
        onClick({
            pes_termo: 1,
        })
        setError(null)
    }, [])
    useEffect(() => (
        cep && onClick(cep)
    ), [cep])
    useEffect(() => {
        pes_cidade && getItens({
            uri: `/cidade/${pes_cidade}`,
            type: 8
        })
    }, [])
    const onSubmit = (event) => {
        event.preventDefault()
        setError(null)
        window.scrollTo(0, 0)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return setError({
                error: 'Você precisa preencher todos os campos',
                variant: 'warning'
            })
        }
        const formData = new FormData()
        formData.append("cid_nome", cid_nome)
        formData.append("pes_bairro", pes_bairro)
        formData.append("pes_celular", pes_celular)
        // formData.append("pes_cep", pes_cep)
        formData.append("pes_cidade", pes_cidade)
        formData.append("pes_email", pes_email)
        formData.append("pes_complemento", pes_complemento)
        formData.append("pes_fantasia", pes_fantasia)
        pes_img && formData.append("pes_img", pes_img)
        preview && formData.append('pes_img', preview.raw)
        formData.append("pes_nome", pes_nome)
        // formData.append("pes_numero", pes_numero)
        formData.append("pes_uf", pes_uf)
        // formData.append("pes_termo", pes_termo)
        formData.append('ps_senha', ps_senha)
        Array.isArray(code) && formData.append('code', JSON.stringify(code))
        Array.isArray(os) && formData.append('os', JSON.stringify(os))
        Array.isArray(db) && formData.append('db', JSON.stringify(db))
        postItens({
            formData,
            uri: pathname === '/profile' ? `/pessoa/update/${pes_codigo}?_method=PUT` : '/pessoa/create',
            redirect: '/',
            method: 'POST',
        })
        setValidated(true)
    }
    const handleImage = ({ target }) => {
        console.log(target.files[0])
        target.files[0] && setPreview({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0]
        })
    }
    const handleSelect = (args) => {
        switch (args) {
            case 0:
                if (cod_desc && code_id) {
                    if (Array.isArray(code)) {
                        code.map(item => (
                            item.code_id !== code_id && setCode([...code, { code_id, cod_desc }]) && onClick({
                                code_id: null,
                                cod_desc: null
                            })
                        ))
                    } else setCode([{ code_id, cod_desc }])
                } else {
                    window.scrollTo(0, 0)
                    setError({
                        error: 'Você precisa selecionar uma linguagem',
                        variant: 'warning'
                    })
                }
                break;
            case 1:
                if (op_codigo && op_desc) {
                    if (Array.isArray(os)) {
                        os.map(item => (
                            item.op_codigo !== op_codigo && setOS([...os, { op_codigo, op_desc }]) && onClick({
                                op_codigo: null,
                                op_desc: null,
                            })
                        ))
                    } else setOS([{ op_codigo, op_desc }])
                } else {
                    window.scrollTo(0, 0)
                    setError({
                        error: 'Você precisa selecionar um sistema operacional',
                        variant: 'warning'
                    })
                }
                break;
            case 2:
                if (db_codigo) {
                    if (Array.isArray(db)) {
                        os.map(item => (
                            item.db_codigo !== db_codigo && setDb([...db, { db_codigo, db_desc }]) && onClick({
                                db_codigo: null,
                                db_desc: null
                            })
                        ))
                    } else setDb([{ db_codigo, db_desc }])
                } else {
                    window.scrollTo(0, 0)
                    setError({
                        error: 'Você precisa selecionar um banco de dados',
                        variant: 'warning'
                    })
                }
                break;
            default:
                break;
        }
    }
    return <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Row>
            <Form.Group controlId="pes_img" as={Col} md={12} xs={12} className="d-none d-md-none d-lg-none">
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control type="file" name="pes_img" onChange={handleImage} />
            </Form.Group>
            <Col md={12} xs={12}>
                <h6>Dados pessoais</h6>
            </Col>
            {/* <Col md={12} xs={12} className="text-center mb-3">
                {pes_img ?
                    <Image src={`https://eshopee.com.br/api${pes_img}`} roundedCircle style={{
                        maxWidth: 320, maxHeight: 320
                    }} className="mb-3" />
                    :
                    preview ?
                        <Image src={preview.preview} roundedCircle style={{
                            maxWidth: 320, maxHeight: 320
                        }} className="mb-3" />
                        :
                        <i className="fa fa-user fa-8x mb-3"></i>
                }
                <Col md={12} xs={12}>
                    {pes_img ?
                        <Button variant="outline-dark">Trocar <i className="fa fa-edit"></i></Button >
                        :
                        <Row>
                            <Col md={6} xs={12}>
                                <Button variant="outline-dark" className="mb-3" onClick={() => {
                                    const button = document.getElementById('pes_img')
                                    button.click()
                                }}>Escolher uma foto <i className="fa fa-camera"></i></Button >
                            </Col>
                            <Col md={6} xs={12}>
                                <Button variant="outline-dark" onClick={() => setPreview(null)}>
                                    Remover uma foto <i className="far fa-window-close"></i></Button >
                            </Col>
                        </Row>
                    }
                </Col>
            </Col > */}
            <Form.Group as={Col} md={6} xs={6} className="mb-3">
                <Form.Label>Meu nome</Form.Label>
                <Form.Control type="text" placeholder="Meu none" name="pes_nome" value={pes_nome}
                    maxLength={50}
                    onChange={onChange} requerid={true} />
            </Form.Group>
            <Form.Group as={Col} md={6} xs={6} className="mb-3">
                <Form.Label>Meu sobrenome</Form.Label>
                <Form.Control type="text" placeholder="Meu sobrenome" name="pes_fantasia"
                    maxLength={50}
                    value={pes_fantasia} onChange={onChange} requerid={true} />
            </Form.Group>
            <Form.Group as={Col} md={6} xs={12} className="mb-3">
                <Form.Label>Meu email</Form.Label>
                <Form.Control type="text" placeholder="meuemail@email.com" name="pes_email"
                    maxLength={50}
                    value={pes_email} onChange={onChange} requerid={true} />
            </Form.Group>
            <Form.Group as={Col} md={6} xs={12} className="mb-3">
                <Form.Label>Minha senha</Form.Label>
                <InputGroup>
                    <Form.Control type={type} name="ps_senha" value={ps_senha} onChange={onChange} placeholder="****" />
                    {ps_senha.length > 3 &&
                        <InputGroup.Text onClick={() => setType(type === "password" ? "text" : "password")}>
                            <i className="fas fa-eye"></i>
                        </InputGroup.Text>
                    }
                </InputGroup>
            </Form.Group>
            <Col md={12} xs={12}>
                <h6>Dados para contato</h6>
            </Col>
            <Form.Group as={Col} md={12} xs={6} className="mb-3">
                <Form.Label>Celular</Form.Label>
                <Form.Control type="text" placeholder="(00) 9999-99999" name="pes_celular" value={pes_celular}
                    maxLength={20}
                    onChange={onChange} requerid={true} />
            </Form.Group>
            <Col md={12} xs={12}>
                <h6>Dados para localidade</h6>
            </Col>
            {Array.isArray(cidade) ?
                <Form.Group as={Col} md={6} xs={12} className="mb-3">
                    <Form.Label>Minha Cidade</Form.Label>
                    <InputGroup>
                        <Form.Control as="select" name="pes_cidade" value={pes_cidade} onChange={onChange} requerid={true}>
                            {cidade.map(item => (
                                <option value={item.cid_codigo} key={item.cid_codigo}>
                                    {item.cid_nome}
                                </option>
                            ))}
                        </Form.Control>
                        <InputGroup.Text onClick={() => setCidade(null)}>
                            <i className="fa fa-search"></i>
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                :
                <Form.Group as={Col} md={6} xs={12} className="mb-3">
                    <Form.Label>Minha Cidade</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder="00" name="cid_nome" value={cid_nome} onChange={onChange} requerid={true} />
                        <InputGroup.Text onClick={() => getItens({
                            uri: `/cidade/d/${cid_nome}`,
                            type: 8
                        })}>
                            <i className="fa fa-search"></i>
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>

            }
            <Form.Group as={Col} md={6} xs={12} className="mb-3">
                <Form.Label>Meu UF</Form.Label>
                <Form.Control as="select" name="pes_uf" value={pes_uf} onChange={onChange}>
                    {Array.isArray(cidade) && cidade.map(item => (
                        <option value={item.cid_uf}>
                            {item.cid_uf}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Col md={12} xs={12}>
                <h6>Frase de efeito</h6>
            </Col>
            <Form.Group as={Col} md={12} xs={6} className="mb-3">
                <Form.Control as="textarea" placeholder="Sua frase aqui" name="pes_complemento" value={pes_complemento}
                    maxLength={100}
                    onChange={onChange} requerid={true}>
                    {pes_complemento}
                </Form.Control>
            </Form.Group>
            <Col md={12} xs={12} className="mb-3">
                <h6 className="fw-bold">Linguagens de programação</h6>
            </Col>
            <Form.Group as={Col} md={12} xs={12} className="mb-3">
                <Form.Label>Desenvolvedor</Form.Label>
                <InputGroup>
                    <Form.Control as="select" name="code_id" onChange={onChangeSelect}>
                        <option>Selecionar</option>
                        {Array.isArray(category) && category.map(item => (
                            <option value={JSON.stringify(item)} key={item.code_id}>
                                {item.cod_desc}
                            </option>
                        ))}
                    </Form.Control>
                    <InputGroup.Text onClick={() => handleSelect(0)}>
                        <i className="far fa-plus-square"></i>
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            {Array.isArray(code) && code.map(item => (
                <Col md={12} xs={12} key={item.code_id} className="mb-3">
                    {item.cod_desc}
                </Col>
            ))}
            <Col md={12} xs={12} className="mb-3">
                <h6 className="fw-bold">Sistemas operacionais</h6>
            </Col>
            <Form.Group as={Col} md={12} xs={12} className="mb-3">
                <Form.Label>Utilizo sistema</Form.Label>
                <InputGroup>
                    <Form.Control as="select" name='op_codigo' onChange={onChangeSelect}>
                        <option>Selecionar</option>
                        {Array.isArray(order) && order.map(item => (
                            <option value={JSON.stringify(item)} key={item.op_codigo}>
                                {item.op_desc}
                            </option>
                        ))}
                    </Form.Control>
                    <InputGroup.Text onClick={() => handleSelect(1)}>
                        <i className="far fa-plus-square"></i>
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            {Array.isArray(os) && os.map(item => (
                <Col md={12} xs={12} key={item.op_codigo} className="mb-3">
                    {item.op_desc}
                </Col>
            ))}
            <Col md={12} xs={12} className="mb-3">
                <h6 className="fw-bold">Banco de Dados</h6>
            </Col>
            <Form.Group as={Col} md={12} xs={12} className="mb-3">
                <Form.Label>Utilizo banco de dados</Form.Label>
                <InputGroup>
                    <Form.Control as="select" name="db_codigo" onChange={onChangeSelect}>
                        <option>Selecionar</option>
                        {Array.isArray(cart) && cart.map(item => (
                            <option value={JSON.stringify(item)} key={item.db_codigo}>
                                {item.db_desc}
                            </option>
                        ))}
                    </Form.Control>
                    <InputGroup.Text onClick={() => handleSelect(2)}>
                        <i className="far fa-plus-square"></i>
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            {Array.isArray(db) && db.map(item => (
                <Col md={12} xs={12} key={item.db_codigo} className="mb-3">
                    {item.db_desc}
                </Col>
            ))}
            <Col md={12} xs={12} className="mb-3">
                <Button variant="dark" type="submit">
                    Criar conta <i className="far fa-user-circle"></i>
                </Button>
            </Col>
            {/* } */}
        </Row >
    </Form >
}
export default ProfileForm