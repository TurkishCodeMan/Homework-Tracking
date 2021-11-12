/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { TopMenuLink, TopMenuLogo, TopMenuProvider } from "components/TopMenu/TopMenu"

import { useAuth } from 'context/AuthContext'
import { ErrorBoundary } from 'react-error-boundary'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from "screens/Dashboard"
import TeacherScreen from 'screens/Teachers'
import StudentScreen from 'screens/Students'
import MyDetail from 'screens/MyDetail';
import { FaBuffer } from 'react-icons/fa';

function ErrorFallback({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
        </div>
    )
}

function AdminRoute({ children, ...rest }) {
    const { isAdmin } = useAuth()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAdmin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}


function TeacherAndStudentRoute({ children, ...rest }) {
    const { isTeacher, isStudent } = useAuth()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isTeacher || isStudent ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function AuthenticatedApp() {
    const { user, isAdmin, isTeacher, isStudent } = useAuth()
    function typeFunc() {
        return isAdmin
            ? 'Admin'
            : isTeacher
                ? 'Teacher'
                : isStudent
                    ? 'Student'
                    : ''
    }
    return (
        <div css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: 'var(--colors-main)',
        }}>
            <TopMenuProvider type={typeFunc()}>

                <TopMenuLogo>
                    <TopMenuLink to="/">
                        <FaBuffer size={30} />
                    </TopMenuLink>
                </TopMenuLogo>

                {isAdmin && (
                    <>
                        <TopMenuLink to="/teachers" >
                            <span>Teachers</span>
                        </TopMenuLink>

                        <TopMenuLink to="/students" >
                            <span>Students</span>
                        </TopMenuLink>
                    </>
                )


                }

                {(isTeacher || isStudent) && (
                    <>
                        <TopMenuLink to="/my-detail" >
                            <span>My Detail</span>
                        </TopMenuLink>

                    </>
                )

                }
            </TopMenuProvider>

            <ErrorBoundary FallbackComponent={ErrorFallback}>



                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <AdminRoute exact path="/teachers">
                        <TeacherScreen />
                    </AdminRoute>
                    <AdminRoute exact path="/students">
                        <StudentScreen />
                    </AdminRoute>

                    <TeacherAndStudentRoute exact path="/my-detail">
                        <MyDetail />
                    </TeacherAndStudentRoute>
                </Switch>



            </ErrorBoundary>
        </div>
    )
}

export default AuthenticatedApp