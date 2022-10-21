import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [ isOpen, setIsOpen ] = useState();

  const onCloseModal = () => {
    console.log('closing');
    setIsOpen( false );
  };

  return (
    <Modal
      isOpen={ isOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className="modal"
      overlayClassName="modal-background"
      closeTimeoutMS={ 200 }
    >
      <h1>Hola</h1>
      <hr />
      <p>Hola locas</p>
    </Modal>
  )
}
