/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from "react"
import { jsx } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { keyframes } from "@emotion/core";
import * as colors from "styles/colors";
import { FaSpinner } from "react-icons/fa"

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
})

const Spinner = styled(FaSpinner)({
    animation: `${spin} 1s linear infinite`,
    color: 'var(--colors-text)'
});
Spinner.defaultProps = {
    'aria-label': 'loading',
}
function FullPageSpinner() {
    return (
        <div
            aria-label="loading"
            css={{
                fontSize: '4em',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Spinner />
        </div>
    )
}



const Input = styled.input({
    border: '.7px solid',
    borderColor: colors.gray20,
    padding: '5px',
    minWidth: '20em'
})

const buttonVariants = {
    primary: {
        background: 'var(--colors-primary-button)',
        color: 'var(--colors-primary-text)',
    },
    secondary: {
        background: colors.gray,
        color: colors.text,

    },
}
const BaseButton = styled.button(
    {
        borderRadius: '3px',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        border: 'none',
        cursor: 'pointer'

    },
    ({ variant = 'primary' }) => buttonVariants[variant],
)

const errorMessageVariants = {
    stacked: { display: 'block' },
    inline: { display: 'inline-block' },
}

function ErrorMessage({ error, variant = 'stacked', ...props }) {
    return (
        <div
            role="alert"
            css={[{ color: colors.danger }, errorMessageVariants[variant]]}
        >
            <span>There was an error: </span>
            <pre
                css={[
                    { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
                    errorMessageVariants[variant],
                ]}
            >
                {error.message}
            </pre>
        </div>
    )
}

const CheckboxContainer = styled.label(
    {
        borderRadius: '100%',
        border: '1px solid black',
        padding: '1px 10px',
      

    }
)
CheckboxContainer.defaultProps = {
    'className': 'checkbox-container'

}

const CheckboxInput = styled.input(
    {
        display: 'none',
        ':checked + label': {
            background: 'green'
        },

    },

)

CheckboxInput.defaultProps = {
    'type': 'checkbox',
}

function CardCheckbox({ ...props }) {
    return (
        <div>
            <CheckboxInput id={props.id} {...props} />
            <CheckboxContainer htmlFor={props.id} />
        </div>

    )
}

export {
    BaseButton,
    Spinner, ErrorMessage,
    Input, FullPageSpinner,
    CardCheckbox
}