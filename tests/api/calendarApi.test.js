import { calendarAPi } from "../../src/api";

describe('should test calendarApi', () => {
  
  test('should have config for default', () => {
    expect( calendarAPi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
  });

  test('should have x-token in header of request', async() => {
    
    const token = 'ABC-123_XYZ';
    localStorage.setItem( 'token', token );
    const res = await calendarAPi.get( '/auth ' );

    expect( res.config.headers['x-token'] ).toBe( token );
  });
});
