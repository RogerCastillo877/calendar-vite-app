import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUploadtedEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Should tes calendarSlice', () => {

  test('should return state for default', () => {
    
    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( initialState );
  });

  test('onSetActiveEvent should active event', () => {
    
    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
    expect( state.activeEvent ).toEqual( events[0] );
  });

  test('onAddNewEvent should add event', () => {

    const newEvent = {
      id: '4',
      start: new Date('2022-11-09 15:00:00'),
      end: new Date('2022-11-09 16:00:00'),
      title: 'Cumpleaños ami',
      notes: 'No hay que comprar'
    }

    const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
    expect( state.events ).toEqual([ ...events, newEvent ]);
  });

  test('onUpdatedEvent should add event', () => {

    const updatedEvent = {
      id: '3',
      start: new Date('2022-11-10 15:00:00'),
      end: new Date('2022-11-10 16:00:00'),
      title: 'Cumpleaños ami',
      notes: 'Hay que comprar'
    }

    const state = calendarSlice.reducer( calendarWithEventsState, onUploadtedEvent( updatedEvent ) );
    expect( state.events ).toContain( updatedEvent );
  });

  test('onDeleteEvent should delete active event', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventsState, onDeleteEvent() );
    
    expect( state.activeEvent ).toBe( null );
    expect( state.events ).not.toContain( events[0] );
  });

  test('onLoadEvents should set events', () => {

    const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );

    expect( state.isLoadingEvents ).toBeFalsy();
    expect( state.events ).toEqual( events );

    const newState = calendarSlice.reducer( initialState, onLoadEvents( events ) );
    expect( state.events.length ).toEqual( events.length );
  });

  test('onLogoutCalendar should clean state', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventsState, onLogoutCalendar() );

    expect( state ).toEqual( initialState );
  });
});