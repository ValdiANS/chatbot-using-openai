import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import Fade from '@mui/material/Fade';

const Modal = ({ children, showModal = true, onClose = () => {} }) => {
  const childrenClickHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      {showModal &&
        createPortal(
          <Fade in={showModal}>
            <div
              onClick={onClose}
              className="w-full h-screen bg-gray-600/30 py-8 px-4 flex flex-row justify-center sm:px-8"
            >
              <div
                onClick={childrenClickHandler}
                className="w-full max-w-sm h-fit "
              >
                {children}
              </div>
            </div>
          </Fade>,

          document.getElementById('modal')
        )}
    </Fragment>
  );
};

export default Modal;
