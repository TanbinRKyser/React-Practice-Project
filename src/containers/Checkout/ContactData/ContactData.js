import {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../Axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                        loading: false
                    });
                    this.props.history.push('/');
                })
                .catch( error => {
                    this.setState({
                        loading: false
                    });
                });
    }

    render(){
        
        let form = (<form>
                        <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
                        <input className={styles.Input} type="text" name="email" placeholder="Your email"/>
                        <input className={styles.Input} type="text" name="street" placeholder="Your street"/>
                        <input className={styles.Input} type="text" name="zip" placeholder="zip"/>
                        <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
                    </form>);
        
        if( this.state.loading ){
            form = <Spinner />;
        }

        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
               {form}
            </div>
        );
    }
}

export default ContactData;