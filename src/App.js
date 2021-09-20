import React,{Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncCompoent';

const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth')
});



class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){

    let protectedRoutes = (<Switch>
                              <Route path="/auth" component={ asyncAuth }/> 
                              <Route path="/" component={ BurgerBuilder } exact/> 
                              <Redirect to="/" />
                          </Switch> );
    if( this.props.authenticated ){
      protectedRoutes = ( <Switch>
                            <Route path="/checkout" component={ asyncCheckout }/> 
                            <Route path="/orders" component={ asyncOrders }/> 
                            <Route path="/auth" component={ asyncAuth }/> 
                            <Route path="/logout" component={ Logout }/>
                            <Route path="/" component={ BurgerBuilder } exact/>  
                            <Redirect to="/" />
                          </Switch> );
    }

    return(
      <div>
        <Layout>
          {protectedRoutes}
        </Layout>
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return{
    authenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(  App ));
