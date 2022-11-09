import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('should test authSlice', () => {

  test('should return initial state', () => {

    expect( authSlice.getInitialState() ).toEqual( initialState );
  });

  test('should do login', () => {

    const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
    expect( state ).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    })
  });

  test('should do logout', () => {
    const state = authSlice.reducer( authenticatedState, onLogout() );

    expect( state ).toEqual({
      status:'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  });
  
  test('should do logout with message', () => {
    
    const errorMessage = 'Credenciales no válidas'
    const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

    expect( state ).toEqual({
      status:'not-authenticated',
      user: {},
      errorMessage: errorMessage
    })
  });

  test('should clean error message', () => {

    const errorMessage = 'Credenciales no válidas'
    const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
    const newState = authSlice.reducer( state, clearErrorMessage() );

    expect( newState.errorMessage ).toBe( undefined );
  });
});