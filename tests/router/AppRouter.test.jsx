import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock( '../../src/hooks/useAuthStore' );

jest.mock( '../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('should test <AppRouter />', () => {

  const mockCheckAuthToken = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('should display the charge screen and call checkAuthToken', () => {

    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    });

    render( <AppRouter /> );

    expect( screen.getByText( 'Cargando...' ) ).toBeTruthy();
    expect( mockCheckAuthToken ).toHaveBeenCalled();
  });

  test('should display login in case that is not authenticated', () => {
    
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter /> 
      </MemoryRouter>
    );

    expect( screen.getByText( 'Ingreso' ) ).toBeTruthy();
    expect( container ).toMatchSnapshot();
  });

  test('should display calendar if is authenticated', () => {
    
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken
    });

    render(
      <MemoryRouter initialEntries={['/auht2/']}>
        <AppRouter /> 
      </MemoryRouter>
    );

    expect( screen.getByText( 'CalendarPage' ) ).toBeTruthy();
  });
});