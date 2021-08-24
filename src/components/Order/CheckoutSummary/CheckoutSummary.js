import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return(
        <div className={styles.CheckoutSummary}>
            <h1>Tastes good right?</h1>
            <div style={{ width : '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button buttonType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button buttonType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;