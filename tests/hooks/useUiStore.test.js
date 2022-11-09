import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store";

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
};

describe('first test useUiStore', () => {

  test('should return default values', () => {

    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });
    
    expect( result.current ).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function), 
      toggleDateModal: expect.any(Function),
    });
  });

  test('opendDateModal should set true in isDateModalOpen', () => {
    
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const { openDateModal } = result.current;
    
    act( () => {
      openDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeTruthy();
  });

  test('closeDateModal should set flase in isDateModalOpen', () => {
    
    const mockStore = getMockStore({ isDateModalOpen: true })

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act( () => {
      result.current.closeDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeFalsy();
  });

  test('toggleDateModal should change state', () => {

    const mockStore = getMockStore({ isDateModalOpen: true })

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act( () => {
      result.current.toggleDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeFalsy();
    
    act( () => {
      result.current.toggleDateModal();
    });
    expect( result.current.isDateModalOpen ).toBeTruthy();
  });
});