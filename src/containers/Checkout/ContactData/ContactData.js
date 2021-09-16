import {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../Axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'regular', display: 'Regular'},
                            {value: 'express', display: 'Express'}]
                },
                validation: {
                    
                },
                valid: true,
                value: 'regular'
            }
        },
        formIsValid: false
    }

    checkValidatity( value, rules ){
        let isValid = true;
        
        if(!rules) return true;
        if( rules.required ){
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        
        for( let formElementId in this.state.orderForm ){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.igdt,
            price: this.props.prc,
            orderData: formData
        }

        this.props.onOrderBurger( order );  
    }

    inputChangeHandler = ( event, inputIdentifier ) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElements = { ...updatedOrderForm[inputIdentifier] };

        updatedFormElements.value = event.target.value;
        updatedFormElements.valid = this.checkValidatity( updatedFormElements.value, updatedFormElements.validation );
        updatedFormElements.touched = true;
        // console.log(updatedFormElements);

        let formIsValid = true;
        for( let inputIdentifier in updatedOrderForm ){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        updatedOrderForm[inputIdentifier] = updatedFormElements;

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render(){
        
        const formElements = [];

        for( let key in this.state.orderForm ){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
                        { formElements.map( formElement => (
                           <Input 
                                key={ formElement.id }
                                elementType={ formElement.config.elementType } 
                                elementConfig={ formElement.config.elementConfig }
                                value={ formElement.config.value }
                                invalid={ !formElement.config.valid }
                                shouldValidate={ formElement.config.validation }
                                touched = { formElement.config.touched }
                                changed={ (event) => this.inputChangeHandler( event, formElement.id ) }/>
                        ))}
                        <Button buttonType="Success" disabled={ !this.state.formIsValid }>Order</Button>
                    </form>);
        
        if( this.props.loading ){
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

const mapStateToProps = state => {
    return {
        igdt: state.ingredients,
        prc: state.totalPrice,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: ( orderData ) => dispatch( actions.purchaseBurger( orderData ) )
    };
}



export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, axios ) );