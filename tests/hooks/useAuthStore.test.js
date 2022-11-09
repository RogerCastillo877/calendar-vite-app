import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { calendarAPi } from "../../src/api";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

describe('should test useAuthStore', () => {

  beforeEach( () => localStorage.clear() );

  const getMockStore = ( initialState ) => {
    return configureStore({
      reducer: {
        auth: authSlice.reducer
      },
      preloadedState: {
        auth: { ...initialState }
      }
    })
  };

  test('should return default values', () => {

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });
    
    expect( result.current ).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function)
    });
  });

  test('startLogin should do login properly', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startLogin( testUserCredentials );
    });
    
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '636bd299fef6c8819677274d' }
    });

    expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
    expect( localStorage.getItem( 'token-init-date' ) ).toEqual( expect.any( String ) );
  });

  test('startLogin should fail in authentication', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startLogin({ email: 'nopasa@gmail.com', password: '123456' });
    });

    const { errorMessage, status, user } = result.current;

    expect( localStorage.getItem( 'token' ) ).toBe( null );
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas', 
      status: 'not-authenticated',
      user: {},
    });

    await waitFor(
      () => expect( result.current.errorMessage ).toBe( undefined )
    );
  });

  test('startRegister should create a user', async() => {
    
    const newUser = { email: 'pasa@gmail.com', password: '123456', name: 'Test Subject' };

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarAPi, 'post' ).mockReturnValue({
      data:{
        ok: true,
        uid: "123",
        name: "Test",
        token: "something"
      }
    });

    await act( async() => {
      await result.current.startRegister( newUser );
    });

    const { errorMessage, status, user } = result.current;
    
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test', uid: '123' }
    });

    spy.mockRestore();
  });

  test('startRegister should fail the creation', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startRegister( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Por favor contacte al administrador',
      status: 'not-authenticated',
      user: {}
    });
  });

  test('checkAuthToken should fail if have not token', async() => {

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    })

    await act( async() => {
      await result.current.checkAuthToken()
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken should authenticate user if have token', async() => {

    const { data } = await calendarAPi.post( '/auth', testUserCredentials );
    localStorage.setItem( 'token', data.token );

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    })

    await act( async() => {
      await result.current.checkAuthToken()
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '636bd299fef6c8819677274d' },
    });
  });
});