import { useDispatch, useSelector } from 'react-redux';
import calendarAPi from '../api/calendarApi';
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

  return {
    // Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
};
