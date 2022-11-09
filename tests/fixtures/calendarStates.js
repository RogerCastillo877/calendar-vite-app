export const events = [
  {
    id: '1',
    start: new Date('2022-11-09 14:00:00'),
    end: new Date('2022-11-09 15:00:00'),
    title: 'Cumpleaños jefa',
    notes: 'Hay que comprar',
  },
  {
    id: '2',
    start: new Date('2022-11-13 13:00:00'),
    end: new Date('2022-11-13 14:00:00'),
    title: 'Aniversario',
    notes: 'Hay que comprar un...',
  },
  {
    id: '3',
    start: new Date('2022-11-09 15:00:00'),
    end: new Date('2022-11-09 16:00:00'),
    title: 'Cumpleaños ami',
    notes: 'No hay que comprar',
  }
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: null
};

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] }
};