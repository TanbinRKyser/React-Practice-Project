import reducer from './auth';
import * as actions from '../actions/actionTypes';

describe( 'auth reducer', () =>{
    it( 'should return the initial state', () => {
        expect( reducer( undefined, {} ) ).toEqual( {
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        })
    });

    it( 'shoudl store the token upon login', () => {
        expect( reducer({
                    token: null,
                    userId: null,
                    error: null,
                    loading: false,
                    redirectPath: '/'
                }, { 
                    type: actions.AUTH_SUCCESS,
                    token: 'some-token',
                    userId: 'some-user-id'
                })).toEqual({
                    token: 'some-token',
                    userId: 'some-user-id',
                    error: null,
                    loading: false,
                    redirectPath: '/'
            });
    });
});