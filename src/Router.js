import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import ScrollToTop from './service/scroll'
import IndexPage from './pages';
import Profile from './pages/profile';
import StorageContext from './context/storageContext';
import { FormContext } from './context/formContext';
import { UserContext } from './context/userContext';
import { ProtectedRoute } from './service/protectRouter';
import Account from './pages/newAccount';
const Router = () => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return "Dude, are you sure you want to leave? Think of the kittens!";
    }
  }, [])
  return <BrowserRouter>
    <ScrollToTop>
      <FormContext>
        <StorageContext>
          <UserContext>
            <Switch>
              <Layout>
                <Route exact path="/" component={IndexPage} />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route path="/account" component={Account} />
                {/* <Route path="/shop/:emp_pop" component={Home} />
                <ProtectedRoute path="/cart" component={Cart} />
                <ProtectedRoute path="/ordens" component={Ordens} />
                */}
              </Layout>
            </Switch>
          </UserContext>
        </StorageContext>
      </FormContext>
    </ScrollToTop>
  </BrowserRouter>
}
export default Router