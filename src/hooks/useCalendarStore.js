import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarAPi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUploadtedEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );
  
  const setActiveEvent = ( CalendarEvent ) => {
    dispatch( onSetActiveEvent( CalendarEvent ) );
  };

  const startSavingEvent = async( calendarEvent ) => {
    
    try {
      
      if( calendarEvent.id ) {
        
        calendarAPi.put(`events/${ calendarEvent.id }`, calendarEvent );
        dispatch( onUploadtedEvent({ ...calendarEvent, user }) );
        return;
      } 
        
      const { data } = await calendarAPi.post('/events', calendarEvent);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
    
    } catch (error) {
      console.log(error);
      Swal.fire( 'Error al guardar', error.response.data?.msg, 'error' );
    }
    
  };

  const startDeletingEvent = async() => {

    try {

      await calendarAPi.delete( `/events/${ activeEvent.id }` );
      dispatch( onDeleteEvent() );
      
    } catch (error) {
      console.log(error);
      Swal.fire( 'Error al eliminar', error.response.data?.msg, 'error' );
    };
  };

  const startLoadingEvents = async() => {

    try {
      
      const { data } = await calendarAPi.get('/events');
      const events = convertEventsToDateEvents( data.events );
      dispatch( onLoadEvents( events ) );

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
