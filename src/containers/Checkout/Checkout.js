import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

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