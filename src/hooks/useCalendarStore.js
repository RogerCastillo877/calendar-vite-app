import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUploadtedEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );
  
  const setActiveEvent = ( CalendarEvent ) => {
    dispatch( onSetActiveEvent( CalendarEvent ) );
  };

  const startSavingEvent = async( calendarEvent ) => {

    if( calendarEvent._id ) {
      dispatch( onUploadtedEvent({ ...calendarEvent }) );
    } else {
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }
  };

  return {
    // Properties
    activeEvent,
    events,

    // Methods
    setActiveEvent,
    startSavingEvent,
  }
};
