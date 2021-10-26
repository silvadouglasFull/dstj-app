/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { storageContext } from '../context/storageContext'
import EshopeeJumbotron from '../components/jumbotrom/eshopeJumbotron'
import SingleEmp from '../components/cards/singleEmp'
import { formContext } from '../context/formContext'
import ProfileModal from '../components/modal/profile_modal'
const IndexPage = () => {
    const { setData, getItens, data } = useContext(storageContext)
    const { onClick } = useContext(formContext)
    useEffect(() => {
        setData(null)
        onClick({
            emp_fantasia: null,
            emp_codigo: null,
        })
        getItens({
            uri: `/pessoa`,
            type: 1,
        })
    }, [])
    return (
        <section>
            <EshopeeJumbotron />
            <Container>
                <h6 className="display-6">
                    Todos os desenvolvedores
                </h6>
                <div className="d-flex justify-content-start">
                    <div className="row">
                        {Array.isArray(data) ? data.map(item => (
                            <SingleEmp item={item} />
                        ))
                            :
                            <Spinner animation="grow" />
                        }
                    </div>
                </div>
            </Container>
            <ProfileModal />
        </section>
        //     <div className="p-4" key={item.emp_fantasia} onClick={() => handleLink(item)}>
        //         <h2>{item.emp_fantasia}</h2>
        //     </div>
    )
}
export default IndexPage