import React from 'react';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';
import styles from './Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys( props.ingredients )
                                        .map( igKey => {
                                            return [...Array( props.ingredients[igKey] )].map( (_, index) => { 
                                                return <BurgerIngredients key={igKey+index} type={igKey} />;
                                            });
                                        }).reduce( (prevValueArr, curValueEl) => { 
                                            return prevValueArr.concat( curValueEl );
                                        }, []);
    
    if( transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
                                            
    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;