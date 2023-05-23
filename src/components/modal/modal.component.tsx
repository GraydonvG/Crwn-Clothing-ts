import { useEffect, useRef, type ReactNode } from 'react';

import Lottie from 'lottie-react';
import Success from '../../assets/svg-animation/green-check-animation.json';
import Failed from '../../assets/svg-animation/red-x-animation.json';
import Alert from '../../assets/svg-animation/circle-alert-animation.json';
import Pending from '../../assets/svg-animation/process-pending.json';

import './modal.styles.scss';

export type ModalTextType = {
  header: string;
  message: string;
};

export enum ModalIconTypes {
  Success = 'success',
  Failed = 'failed',
  Alert = 'alert',
  Pending = 'pending',
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalHeader?: string;
  modalMessage?: string;
  modalIconType?: ModalIconTypes;
  children: ReactNode;
};

function Modal({ isOpen, onClose, modalHeader, modalMessage, modalIconType, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function outsideClickHandler(event: MouseEvent) {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('click', outsideClickHandler, true);

    return () => {
      document.removeEventListener('click', outsideClickHandler, true);
    };
  }, [isOpen, onClose]);

  return (
    <div className="modal-overlay">
      <div
        className="modal-container"
        ref={modalRef}>
        <div className="modal-content">
          {modalHeader && <h2 className="modal-header">{modalHeader}</h2>}
          {modalIconType && (
            <Lottie
              className={`modal-icon  ${modalIconType}`}
              animationData={
                modalIconType === 'success'
                  ? Success
                  : modalIconType === 'failed'
                  ? Failed
                  : modalIconType === 'alert'
                  ? Alert
                  : modalIconType === 'pending'
                  ? Pending
                  : null
              }
              loop={false}
            />
          )}
          {modalMessage && (
            <div className="modal-message-container">
              <span className="modal-message">{modalMessage}</span>
            </div>
          )}
          <div className="modal-buttons">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
