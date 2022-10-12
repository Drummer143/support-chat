import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

type Props = {
    children: React.ReactNode;

    className?: string;

    handleOverlayClick?: Function;
    handleEscapeButtonClick?: Function;

    onMount?: Function;
};

/* const handleEscapeButtonClickDefault = (element: HTMLElement) => {
    modalRoot?.removeChild(element);
}; */

function Modal({
    children,
    className = '',
    handleOverlayClick = () => {},
    handleEscapeButtonClick = () => {},
    onMount = () => {}
}: Props) {
    const [container] = useState(document.createElement('div'));

    useEffect(() => {
        modalRoot?.appendChild(container);

        container.className = className;

        container.onclick = e => {
            if (e.target === container) {
                handleOverlayClick();
            }
        };

        // container.onkeydown = e => {
        //     switch (e.keyCode) {
        //         case 27:
        //             handleEscapeButtonClick(container);
        //             break;
        //     }
        // };

        onMount();

        return () => {
            modalRoot?.removeChild(container);
        };
    });

    return ReactDOM.createPortal(children, container);
}

export default Modal;
