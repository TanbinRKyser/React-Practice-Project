import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "../BuildControls/BuildControl/BuildControl";

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];


const buildControls = ( props ) => (
    <div className={styles.BurgerControls}>
        <p>Burger Price: <strong>$ {props.price.toFixed(2)} </strong></p>
        {controls.map( ctrl => {
            return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={ () => props.ingredientAdded(ctrl.type) }
                    removed={ () => props.ingredientRemoved(ctrl.type) }
                    disabled={ props.disabled[ctrl.type] }/>
        })}
    </div>
);

export default buildControls;