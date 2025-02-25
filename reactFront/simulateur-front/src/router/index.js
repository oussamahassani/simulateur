import IndexPage from '../components/IndexPage';
import SwitchPage from '../components/SwitchPage';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import CoreAppBar from '../components/core/Header';
import CoreFooter from '../components/core/Footer';
function RouterApp() {
  return (
    <BrowserRouter>
   <CoreAppBar />
      <Switch>
        <Route path="/" exact  component={IndexPage } />
        <Route path="/switch" exact  component={SwitchPage } />
      </Switch>
      <CoreFooter/>
    </BrowserRouter>
  );
}

export default RouterApp;
