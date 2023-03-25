import { CloseIcon } from '@src/assets/icons';
import useOutsideClick from '@src/hooks/useOutsideClick';
import { useApp, useModal } from '@src/lib/store';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

function Modal() {
  const { modal, setModal, closeModal } = useModal();
  const { loading } = useApp();
  const isSidebar = modal?.type === 'sidebar';

  const ref = useRef(null);
  const isOpen = !!modal;
  const toggle = () => {
    if (modal?.handleClose) {
      modal.handleClose();
    } else {
      setModal(null);
    }
  };
  useOutsideClick([ref], toggle);

  function handleEsc(event: any) {
    if (loading) {
      return;
    }
    if (event.key === 'Escape' && !loading) {
      event.preventDefault();
      closeModal();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      className={classNames(
        isOpen ? 'bg-opacity-30 z-10' : 'bg-opacity-0 -z-10',
        'absolute w-screen h-full bg-black'
      )}
    >
      <div
        ref={ref}
        className={classNames(
          'z-20 w-full  dark:bg-dark2 bg-light1 shadow-lg',
          modal?.maxWidth ?? 'max-w-3xl',
          !isSidebar && 'h-min rounded absolute top-20 left-1/2 -translate-x-1/2',
          !isSidebar && modal?.maxHeight,
          isSidebar && 'fixed right-0 h-screen top-0',
          modal?.className ?? ''
        )}
      >
        <div className="w-100 dark:bg-dark3 bg-slate-200 rounded-t px-4 h-12 flex items-center relative">
          <h2>{modal?.title}</h2>
          <button
            tabIndex={modal ? 0 : -1}
            onClick={toggle}
            className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded leading-none"
          >
            <CloseIcon className="dark:fill-slate-50 fill-slate-900" />
          </button>
        </div>
        <div className="h-full">{modal?.content}</div>
      </div>
    </div>
  );
}

export default Modal;
