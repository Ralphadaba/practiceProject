import { forwardRef, useImperativeHandle, useRef } from 'react';

import { createPortal } from 'react-dom';
import Button from './Button.jsx';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() { //open() is now a method provided by this component to other components via useImpera...
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root') //This is where the content(Modal component) should be rendered
    );
});

export default Modal; 