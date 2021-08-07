import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.3,
    cheese: 1,
    meat: 2.2
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese: 0,
            meat  : 0
        },
        totalPrice: 2.99,
        purchasable: false,
        purchasing: false,
        loading: false
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
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
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
    }

    removeIngredientHandler = (type) => {  
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
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        // alert('Click on the bottom to continue.');

        this.setState({ loading: true })

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
                });
    }

    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                purchaseCancelHandler={this.purchaseCancelHandler}
                                purchaseContinueHandler={this.purchaseContinueHandler} 
                                price={this.state.totalPrice}/>

        if( this.state.loading ){
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);