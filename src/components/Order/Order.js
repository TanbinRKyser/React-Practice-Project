import styles from './Order.module.css';

const order = (props) => {
    const ingredients =[];
    for( let ingredient in props.ingredients ){
        ingredients.push({ 
            name: ingredient, 
            amount: props.ingredients[ingredient] 
        });
    }

    let ingredientOutput = ingredients.map( ig => {
        return <span 
                    style={{ 
                            textTransform: 'capitalize', 
                            display: 'inline-block', 
                            margin: '0 8px', 
                            border: '1px solid #ccc',
                            padding: '5px' 
                        }}
                    key={ig.name}> 
                                {ig.name} : ({ig.amount}) 
                </span>
    })
    return(
        <div className={styles.Order}>
            <p>{ingredientOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default order;