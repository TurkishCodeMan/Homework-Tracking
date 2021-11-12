import React from "react"
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalContents, ModalOpenButton } from "../Modal";


test('open closed modal test', async () => {
    const title = 'my-modal';
    const content = 'my-content';
    const label = 'my-label';
    render(
        <Modal>
            <ModalOpenButton>
                <button>Open</button>
            </ModalOpenButton>
            <ModalContents title={title} aria-label={label}>
                <div>{content}</div>
            </ModalContents>
        </Modal>
    )
    userEvent.click(screen.getByRole('button', { name: /open/i }));
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-label', label);
    const inModal = within(modal);
    expect(inModal.getByText(content)).toBeInTheDocument();
    expect(inModal.getByRole('button', { name: /close/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
})