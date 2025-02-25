import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));



const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));


const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));



const Mdi = lazy(() => import('./icons/Mdi'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));
const addNewUser = lazy(() => import('./user-pages/addNewUser'));

const BlankPage = lazy(() => import('./general-pages/BlankPage'));

const boilerPage = lazy(() => import('./components/IndexPage'))
const switchPage = lazy(() => import('./components/SwitchPage'));
const ListeUser = lazy(() => import('./user-pages/ListeUser'));


class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/boiler" component={boilerPage} />
          <Route path="/switch" component={switchPage} />

          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />


          <Route path="/form-Elements/basic-elements" component={BasicElements} />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/tables/liste-user" component={ListeUser} />

          <Route path="/icons/mdi" component={Mdi} />


          <Route path="/charts/chart-js" component={ChartJs} />


          <Route path="/login" component={Login} />
          <Route path="/register" component={Register1} />
          <Route path="/addNewUser" component={addNewUser} />

          <Route path="/error-404" component={Error404} />
          <Route path="/error-500" component={Error500} />

          <Route path="/general-pages/blank-page" component={BlankPage} />


          <Redirect to="/login" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;