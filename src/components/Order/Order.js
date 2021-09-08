import styles from './Order.module.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredients: Salad(1)</p>
        <p>Price: <strong>USD 4.99</strong></p>
    </div>
);

export default order;