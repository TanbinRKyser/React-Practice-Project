import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients : null,
    totalPrice: 0,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.3,
    cheese: 1,
    meat: 2.2
}

const addIngredient = ( state, action) => {
    const updatedIngredient = { [ action.ingredientName ] : state.ingredients[ action.ingredientName ] + 1 };
            const updatedIngredients = updateObject( state.ingredients, updatedIngredient);
            const updatedState = {  ingredients: updatedIngredients,
                                    totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ],
                                    building: true
                                }
            return updateObject( state, updatedState );
}

const removeIngredient = (state, action ) => {
    const updatedIngredient = { [ action.ingredientName ] : state.ingredients[ action.ingredientName ] - 1 };
            const updatedIngredients = updateObject( state.ingredients, updatedIngredient);
            const updatedState = { ingredients: updatedIngredients,
                                    totalPrice: state.totalPrice - INGREDIENT_PRICES[ action.ingredientName ],
                                    building: true
                                }
            return updateObject( state, updatedState );
}

const setIngredient = (state, action ) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat
        },
        totalPrice: 0,
        error: false,
        building: false
    }); 
}

const fetchIngredientsFailed = (state, action ) => {
    return updateObject( state, {error: true} );
}


const reducer = ( state=initialState, action ) => {
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient( state, action );
        case actionTypes.SET_INGREDIENTS: return setIngredient( state, action );     
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed( state, action );
        default: return state;    
    }
};

export default reducer;