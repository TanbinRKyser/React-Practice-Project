import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients : null,
    totalPrice: 0,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.3,
    cheese: 1,
    meat: 2.2
}

const reducer = ( state=initialState, action ) => {

    switch( action.type ){
        
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [ action.ingredientName ] : state.ingredients[ action.ingredientName ] + 1 };
            const updatedIngredients = updateObject( state.ingredients, updatedIngredient);
            const updatedState = {  ingredients: updatedIngredients,
                                    totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ]
                                }
            return updateObject( state, updatedState );

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient2 = { [ action.ingredientName ] : state.ingredients[ action.ingredientName ] - 1 };
            const updatedIngredients2 = updateObject( state.ingredients, updatedIngredient2);
            const updatedState2 = { ingredients: updatedIngredients2,
                                    totalPrice: state.totalPrice - INGREDIENT_PRICES[ action.ingredientName ]
                                }
            return updateObject( state, updatedState2 );

        case actionTypes.SET_INGREDIENTS:
            return updateObject( state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat
                },
                totalPrice: 0,
                error: false
            });     

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject( state, {error: true} );

        default:
            return state;
            
    }
};

export default reducer;