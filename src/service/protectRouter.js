import React, { useContext } from 'react';
import { Route, useHistory, } from 'react-router-dom';
import { userContext, } from '../context/userContext';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { access, setLogin } = useContext(userContext);
    const { push } = useHistory()
    const redirectRouter = () => {
        push('/')
        setLogin(true)
    }
    return (
        <Route
            {...rest}
            render={props =>
                access ? (
                    <Component {...props} />
                ) :
                    redirectRouter()
            }
        />
    );
};
