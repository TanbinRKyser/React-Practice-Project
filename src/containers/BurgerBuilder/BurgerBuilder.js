import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount(){
        // console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                            .map( igKey => {
                                return ingredients[igKey]
                            })
                            .reduce( ( prevValSum, newValElm ) => {
                                return prevValSum + newValElm; 
                            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    
    render(){
        const disabledInfo = {
            ...this.props.igdt
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.err ? <p>Ingredients can't be loaded</p> : <Spinner/>

     
        if( this.props.igdt ){
            burger = (<Aux>
                <Burger ingredients= {this.props.igdt }/>
                <BuildControls 
                    ingredientAdded={ this.props.onAddIngredient } 
                    ingredientRemoved={ this.props.onRemoveIngredient } 
                    disabled={ disabledInfo }
                    price={ this.props.prc }
                    purchasable={ this.updatePurchaseState( this.props.igdt ) }
                    ordered={ this.purchaseHandler } />
            </Aux>);

            orderSummary = (
                            <OrderSummary 
                                ingredients={ this.props.igdt }
                                purchaseCancelHandler={ this.purchaseCancelHandler }
                                purchaseContinueHandler={ this.purchaseContinueHandler } 
                                price={ this.props.prc } />
            ); 
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        igdt: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: ( ingName ) => dispatch(actions.addIngredient( ingName ) ),
        onRemoveIngredient: ( ingName ) => dispatch(actions.removeIngredient( ingName ) ),
        onInitIngredients: () => dispatch( actions.initIngredients() ),
        onInitPurchase: () => dispatch( actions.purchaseInit() ) 
         
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );