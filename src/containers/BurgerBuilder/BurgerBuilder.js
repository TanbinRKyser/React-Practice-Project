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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{

    state = {
        // ingredients : null,
        // totalPrice: 2.99,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // console.log(this.props);
        // axios.get('URL')
        //     .then( response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch( error =>{
        //         // console.log(error);
        //         this.setState({ error: true})
        //     });
    }

    updatePurchaseState(ingredients) {
        // const ingredients = {...this.state.ingredients};

        const sum = Object.keys(ingredients)
                            .map( igKey => {
                                return ingredients[igKey]
                            })
                            .reduce( ( prevValSum, newValElm ) => {
                                return prevValSum + newValElm; 
                            } ,0);
        
        // console.log(sum);
        // this.setState({ purchasable: sum > 0 });
        return sum > 0;
    }

    /* addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        
        const addedPrice = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addedPrice;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    } */

    /* removeIngredientHandler = (type) => {  
        const oldCount = this.state.ingredients[type];

        if( oldCount <= 0 ){
            return;
        }

        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        
        const deductedPrice = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    } */

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        // alert('Click on the bottom to continue.');

        /* this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'tusker',
                address: {
                    street: '16th avenue',
                    city: 'DHC',
                    zip: '1230'
                },
                email: 'tusker@test.com',
            },
            deliveryMethod: 'fast'
        }

        axios.post('/orders.json' , order)
                .then( response => {
                    this.setState({ 
                        loading: false,
                        purchasing: false 
                    });
                })
                .catch( error => {
                    this.setState({
                        loading: false,
                        purchasing: false
                    });
                }); */

        const queryParams = [];
        
        for( let i in this.state.ingredients ){
            queryParams.push( encodeURIComponent(i) 
                                + '=' 
                                + encodeURIComponent(this.state.ingredients[i]) );
        } 
        queryParams.push("price="+this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    
    render(){
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.igdt
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        // if( this.state.ingredients ){
        if( this.props.igdt ){
            burger = (<Aux>
                {/* <Burger ingredients={this.state.ingredients}/> */}
                <Burger ingredients={this.props.igdt}/>
                    <BuildControls 
                        // ingredientAdded={ this.addIngredientHandler }
                        ingredientAdded={ this.props.onAddIngredient }
                        // ingredientRemoved={this.removeIngredientHandler} 
                        ingredientRemoved={ this.props.onRemoveIngredient } 
                        disabled={disabledInfo}
                        // price={this.state.totalPrice}
                        price={this.props.prc}
                        // purchasable={this.state.purchasable}
                        purchasable={this.updatePurchaseState(this.props.igdt)}
                        ordered={this.purchaseHandler}/>
            </Aux>);

            orderSummary = (
                            <OrderSummary 
                                // ingredients={this.state.ingredients}
                                ingredients={this.props.igdt}
                                purchaseCancelHandler={this.purchaseCancelHandler}
                                purchaseContinueHandler={this.purchaseContinueHandler} 
                                // price={this.state.totalPrice}
                                price={this.props.prc}/>
            ); 
        }

        if( this.state.loading ){
            orderSummary = <Spinner />;
            
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
        igdt: state.ingredients,
        prc: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: ( ingName ) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onRemoveIngredient: ( ingName ) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

// export default withErrorHandler(BurgerBuilder, axios);
export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(BurgerBuilder, axios));