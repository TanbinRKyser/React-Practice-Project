import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount(){
            // request
            this.requestInterceptor = axios.interceptors.request.use( request => {
                this.setState({ error: null });
                return request;
            });
            // response
            this.responseInterceptor = axios.interceptors.response.use( response => {
                return response;
            }, error =>{
                this.setState({ error : error })
            });
        }

        componentWillUnmount(){
            // console.log('Will unmount', this.requestInterceptor, this.responseInterceptor);
            axios.interceptors.request.eject( this.requestInterceptor );
            axios.interceptors.response.eject( this.requestInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState({error : null })
        }

        render() {
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent { ...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;