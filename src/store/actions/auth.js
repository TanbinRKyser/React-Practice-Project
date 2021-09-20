import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( idToken, localId ) => {
    // console.log( authData.registered ? 'Verified' : 'Log in first');
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: idToken, 
        userId: localId
    }
}

export const authFail = ( error ) => {
    // console.log( error.response.data.error.message);
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'userId' );
    localStorage.removeItem( 'expirationDate' );

    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() );
        }, expirationTime * 1000 );
    }
}

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = ( email, password, isSignup ) => {
    return dispatch => {
       
        dispatch( authStart() );
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        let API_KEY = 'API_KEY';

        if( !isSignup ){
            url = url + 'signInWithPassword?key=' + API_KEY;
        } else {
            url = url + 'signUp?key=' + API_KEY;
        }

        // console.log( url );
        axios.post( url, authData )
            .then( response => {
                // console.log( response );
                const expirationDate = new Date( new Date().getTime() + ( response.data.expiresIn * 1000 ) );

                localStorage.setItem( 'token', response.data.idToken );
                localStorage.setItem( 'userId', response.data.localId );
                localStorage.setItem( 'expirationDate', expirationDate );
                
                dispatch( authSuccess( response.data.idToken, response.data.localId ) );
                dispatch( checkAuthTimeout( response.data.expiresIn ) );
            })
            .catch( error => {
                dispatch( authFail( error.response.data.error ) );
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        
        if( !token ){
            dispatch( logout() );
        } else {
            const expirationDate = new Date( localStorage.getItem( 'expirationDate' )  );
        
            if( expirationDate <= new Date() ){
                dispatch( logout() ) 
            } else {
                const userId = localStorage.getItem('userId');
                dispatch( authSuccess( token, userId ) );
                const time = ( expirationDate.getTime() - new Date().getTime() );
                dispatch( checkAuthTimeout( time / 1000 ) );
            }
        }
    }
}