import { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={ this.props.igdt }
                    checkoutCancelled ={this.CheckoutCancelledHandler}
                    checkoutContinued = {this.CheckoutContinuedHandler}/>
                <Route 
                    path={ this.props.match.path + '/contact-data' } 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        igdt: state.ingredients
    };
};

export default connect( mapStateToProps )( Checkout );