import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    
    const ingredientSummary = Object.keys( props.ingredients )
                                    .map( igKey => {
                                        return <li key={igKey}>
                                                    <span style={ {textTransform: 'capitalize'} }> { igKey } </span>
                                                    : { props.ingredients[igKey] }
                                                </li>
                                    });

    return (
        <Aux>
            <h3>Your Orders</h3>
            <p>A delicious burger with following ingredients</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} </strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancelHandler}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinueHandler}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;