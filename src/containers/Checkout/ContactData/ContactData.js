import {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';

class ContactData extends Component{
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        }
    }

    render(){
    
        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                <form action="">
                    <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={styles.Input} type="text" name="email" placeholder="Your email"/>
                    <input className={styles.Input} type="text" name="street" placeholder="Your street"/>
                    <input className={styles.Input} type="text" name="zip" placeholder="zip"/>
                    <Button buttonType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;