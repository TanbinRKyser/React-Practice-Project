import {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../Axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'regular', display: 'Regular'},
                            {value: 'express', display: 'Express'}]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
    inputChangeHandler = ( event, inputIdentifier ) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElements = { ...updatedOrderForm[inputIdentifier] };

        updatedFormElements.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElements;

        this.setState({ orderForm: updatedOrderForm });
    }

    render(){
        
        const formElements = [];

        for( let key in this.state.orderForm ){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form>
                        { formElements.map( formElement => (
                           <Input 
                                key={ formElement.id }
                                elementType={ formElement.config.elementType } 
                                elementConfig={ formElement.config.elementConfig }
                                value={ formElement.config.value }
                                changed={ (event) => this.inputChangeHandler( event, formElement.id ) }/>
                        ))}
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