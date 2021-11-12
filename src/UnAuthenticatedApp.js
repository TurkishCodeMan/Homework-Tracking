/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { cloneElement, useState } from "react";
import * as colors from "styles/colors";
import { BaseButton, ErrorMessage, Spinner, Input, CardCheckbox } from "./shared/components/lib";
import { useAsync } from "./shared/hooks/useAsync";
import { FaRegEye } from "react-icons/fa";
import { useAuth } from 'context/AuthContext';

function AuthForm({ onSubmit, submitButton }) {
    const { isLoading, isError, error, run } = useAsync();
    const [showPassword, setShowPassword] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        const { email, password, student, teacher } = event.target.elements;
        run(
            onSubmit({
                Username: email.value,
                Password: password.value,
                Type:student.checked?0:teacher.checked?1:null
            })
        )
    }

    return (
        <form onSubmit={handleSubmit}
            css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            <div css={{ marginBottom: '10px' }}>
                <label htmlFor="email">
                    <div css={{ color: colors.gray80 }}> Email</div>
                    <Input id="email" />
                </label>
            </div>
            <div css={{ marginBottom: '10px' }}>
                <label htmlFor={'password'}
                    css={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <div css={{ color: colors.gray80 }}>Password</div>
                        <Input type={showPassword ? "password" : "text"} id="password" />
                    </div>
                    <span role="presentation" onClick={() => setShowPassword((showPass) => !showPass)} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FaRegEye size={20} />
                    </span>
                </label>
            </div>
            <div css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%'
            }}>
                <div >
                    <label htmlFor={'student'}>
                        <div css={{ color: colors.gray80, marginBottom: '5px' }}>Student</div>
                        <CardCheckbox key="student" id="student" />

                    </label>
                </div>
                <div >
                    <label htmlFor={'teacher'}>
                        <div css={{ color: colors.gray80, marginBottom: '5px' }}>Teacher</div>
                        <CardCheckbox key="teacher" id="teacher" />

                    </label>
                </div>
            </div>
            <div css={{ marginBottom: '10px' }}>

                {
                    cloneElement(
                        submitButton,
                        { type: 'submit', },

                        ...(Array.isArray(submitButton.props.children)
                            ? submitButton.props.children
                            : [submitButton.props.children]),
                        isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
                    )

                }
            </div>
            {isError ? <ErrorMessage error={error} /> : null}

        </form>
    )
}

function LoginWrapper({ title, ...props }) {
    return (
        <div css={{
            background: '#fff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '12px',
            boxShadow: '-7px 4px 16px 0px rgba(196,196,196,1)'
        }}>
            <h3 css={{
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                fontStyle: 'bold'
            }}><div>{title}</div> or
                <a href="/" css={{
                    display: 'block',
                    fontSize: '10px',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}>Create an account
                </a>
            </h3>

            <div {...props} />

        </div>
    )
}

function UnAuthenticatedApp() {
    const { login } = useAuth();

    return (
        <div css={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: colors.MainBG
        }}>
            <LoginWrapper title="Sign-in">
                <AuthForm
                    onSubmit={({ Username, Password,Type }) =>
                        login({ username: Username, password: (Password),type:Type })}
                    submitButton={<BaseButton variant="primary">Login</BaseButton>}
                />
            </LoginWrapper>
        </div>
    );
}

export default UnAuthenticatedApp;
