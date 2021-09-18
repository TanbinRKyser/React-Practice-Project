import * as actionTypes from '../actions/actionTypes';
import axios from '../../Axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) => { 
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = ( error ) => {
    return{ 
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START 
    }
}

export const purchaseBurger = ( orderData, token ) => {

    return dispatch => {

        dispatch( purchaseBurgerStart() );

        const queryParam = '?auth=' + token ;

        axios.post( '/orders.json' + queryParam, orderData )
                .then( response => {
                    dispatch( 
                        purchaseBurgerSuccess( 
                            response.data.name, 
                            orderData 
                        ) 
                    )
                })
                .catch( error => {
                    dispatch( purchaseBurgerFail( error ) );
                });

    }
}

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return{ 
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = ( orders ) => {
    return{ 
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = ( error ) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        error: error
    }
}

export const fetchOrders = ( token ) => {
    return dispatch => {
        
        dispatch( fetchOrdersStart() );
        
        const queryParam = '?auth=' + token;

        axios.get( '/orders.json' + queryParam )
            .then( response => { 
                const fetchedOrders = [];
                
                for( let key in response.data ){
                    fetchedOrders.push({ 
                        ...response.data[ key ],
                        id: key
                    });
                }
                dispatch( fetchOrdersSuccess( fetchedOrders ) ); 
            })
            .catch( error => { 
                dispatch( fetchOrdersFail( error ));
            });
    }
}