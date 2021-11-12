/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { createContext, useState, useContext } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css"
import { callAll } from 'utils/misc';

const ModalContext = createContext();
ModalContext.displayName = "Modal";


function useModal() {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error(`use Modal context in not wrap element`)
    return context;
}

function Modal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);
    return <ModalContext.Provider value={{ isOpen, closeModal, openModal }} {...props} />

}



function ModalDismissButton({ children }) {
    const { closeModal } = useModal();
    return React.cloneElement(children,
        {
            onClick:
                callAll(() => closeModal(),
                    children.props?.onClick,
                )
        }
    )
}

function ModalOpenButton({ children }) {
    const { openModal } = useModal();
    return React.cloneElement(children,
        {
            onClick:
                callAll(() => openModal(),
                    children.props?.onClick)
        }
    )
}

function ModalContentBase({closedCallFn,...props}) {
    const { isOpen, closeModal } = useModal();
    return (
        <Dialog css={{ background: 'gray', borderRadius: '8px' }} isOpen={isOpen} onDismiss={callAll(
            ()=>closeModal(),
            closedCallFn,
        )} {...props} />
    )
}

function ModalContents({ title, children,closedCallFn=()=>{}, ...props }) {


    return (
        <ModalContentBase closedCallFn={closedCallFn} {...props} >
            <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ModalDismissButton>

                    <button  onClick={closedCallFn}
                     css={{
                        background: 'transparent',
                        border: 'none'
                       
                    }}>Close</button>

                </ModalDismissButton>
            </div>
            <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
            {children}
        </ModalContentBase>
    )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents, useModal }
