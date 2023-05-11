import { useEffect, useRef } from 'react';

import './modal.styles.scss';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef();

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
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
