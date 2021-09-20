import { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../Axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';
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
                    maxLength: 5,
                    isNumeric: true
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
                    required: true,
                    isEmail: true
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

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        
        for( let formElementId in this.state.orderForm ){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.igdt,
            price: this.props.prc,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger( order, this.props.token );  
    }

    inputChangeHandler = ( event, inputIdentifier ) => {

        const updatedFormElements = updateObject( this.state.orderForm[inputIdentifier],{ 
            value: event.target.value,
            valid: checkValidity( event.target.value, this.state.orderForm[inputIdentifier].validation ),
            touched: true
        } );

        const updatedOrderForm = updateObject( this.state.orderForm, { 
            [inputIdentifier] : updatedFormElements
        } );

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
        igdt: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: ( orderData, token ) => dispatch( actions.purchaseBurger( orderData, token ) )
    };
}



export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, axios ) );