import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: '600px',
    backgroundColor: '#323232',
    borderColor: '#616263',
    padding: '2rem'
  },
  overlay: {
    backgroundColor: 'rgba(0 0 0 / .8)',
    zIndex: 21
  }
};

const Modal = ({children}) => {
  return (
    <ReactModal
      isOpen
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
