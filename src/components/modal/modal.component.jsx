import { useEffect, useRef } from 'react';

import './modal.styles.scss';

function Modal({ isOpen, onClose, modalText, children }) {
  const modalRef = useRef();
  const { header, message } = modalText;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (isOpen && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('click', handleOutsideClick, true);

    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [isOpen, onClose]);

  return (
    <div className="modal-overlay">
      <div
        className="modal-container"
        ref={modalRef}>
        <div className="modal-content">
          <h2 className="modal-header">{header}</h2>
          <h3 className="modal-text">{message}</h3>
          <div className="modal-buttons">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
