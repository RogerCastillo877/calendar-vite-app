import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";

describe('should test authSlice', () => {

  test('should return initial state', () => {

    expect( authSlice.getInitialState() ).toEqual( initialState );
  });
});