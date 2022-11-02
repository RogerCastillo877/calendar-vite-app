import { useDispatch, useSelector } from 'react-redux';
import calendarAPi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUploadtedEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );
  
  const setActiveEvent = ( CalendarEvent ) => {
    dispatch( onSetActiveEvent( CalendarEvent ) );
  };

  const startSavingEvent = async( calendarEvent ) => {

    if( calendarEvent._id ) {
      dispatch( onUploadtedEvent({ ...calendarEvent }) );
    } else {
      const { data } = await calendarAPi.post('/events', calendarEvent);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
    };
  };

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  };

  const startLoadingEvents = async() => {

    try {
      
      const { data } = await calendarAPi.get('/events');
      const events = convertEventsToDateEvents( data.events );
      console.log(events);

    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  return {
    // Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  }
};
