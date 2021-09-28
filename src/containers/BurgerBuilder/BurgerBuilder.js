import {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../Axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState( ingredients ) {
        const sum = Object.keys( ingredients )
                            .map( igKey => {
                                return ingredients[ igKey ]
                            })
                            .reduce( ( prevValSum, newValElm ) => {
                                return prevValSum + newValElm; 
                            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if( this.props.authenticated ){
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath( '/checkout' );
            this.props.history.push( '/auth' );
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push( '/checkout' );
    }

    
    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };

        for ( let key in disabledInfo ) {
            disabledInfo[ key ] = disabledInfo[ key ] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

     
        if( this.props.ingredients ){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ingredients }/>
                    <BuildControls 
                        ingredientAdded = { this.props.onAddIngredient } 
                        ingredientRemoved = { this.props.onRemoveIngredient } 
                        disabled = { disabledInfo }
                        price = { this.props.price }
                        purchasable = { this.updatePurchaseState( this.props.ingredients ) }
                        ordered = { this.purchaseHandler } 
                        authenticated = { this.props.authenticated } />
                </Aux>
            );

            orderSummary = (
                            <OrderSummary 
                                ingredients = { this.props.ingredients }
                                purchaseCancelHandler = { this.purchaseCancelHandler }
                                purchaseContinueHandler = { this.purchaseContinueHandler } 
                                price = { this.props.price } />
            ); 
        }

        return(
            <Aux>
                <Modal show = { this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
               { burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        authenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: ( ingName ) => dispatch(actions.addIngredient( ingName ) ),
        onRemoveIngredient: ( ingName ) => dispatch(actions.removeIngredient( ingName ) ),
        onInitIngredients: () => dispatch( actions.initIngredients() ),
        onInitPurchase: () => dispatch( actions.purchaseInit() ),
        onSetAuthRedirectPath: ( path ) => dispatch( actions.setAuthRedirectPath( path ) ) 
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );