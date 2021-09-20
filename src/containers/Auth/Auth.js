import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount(){
        if( !this.props.buildingBurger && this.props.authRedirectPath ){
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangedHandler = ( event, controlName ) => { 
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            })
        } );
        
        this.setState({controls: updatedControls});
    }

    onSubmitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    switchOffModeHandler = () => {
        this.setState( prevState => { 
            return { isSignup: !prevState.isSignup }
         });
    }

    render(){

        const formElements = [];

        for( let key in this.state.controls ){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElements.map( formElement => (
            <Input 
                key= {formElement.id}
                elementType={ formElement.config.elementType } 
                elementConfig={ formElement.config.elementConfig }
                value={ formElement.config.value }
                invalid={ !formElement.config.valid }
                shouldValidate={ formElement.config.validation }
                touched = { formElement.config.touched }
                changed={ (event) => this.inputChangedHandler( event, formElement.id ) } />
        ));

        if( this.props.loading ){
            form = <Spinner />
        }

        let errorMessage = null;
        if( this.props.error ){
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let redirect = null;

        if( this.props.authenticated ){
            redirect = <Redirect to={ this.props.authRedirectPath } />
        }

        return(
            <div className={styles.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    { form }    
                    <Button buttonType="Success">Submit</Button>
                </form>
                <Button 
                    buttonType="Danger"
                    clicked={ this.switchOffModeHandler }>
                        Switch To { this.state.isSignup ? 'Sign In' : 'Sign Up' }
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth : ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath : ( path ) => dispatch( actions.setAuthRedirectPath( path ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Auth );