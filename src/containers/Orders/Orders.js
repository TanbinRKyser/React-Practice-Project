import { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from "../../Axios-orders";
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />
        if( !this.props.loading ){
            // fix the empty orders
            if( this.props.orders ){
                orders = this.props.orders.map( order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ));
            }
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch( actions.fetchOrders() )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(Orders, axios) );