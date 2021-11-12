import React, { lazy, Suspense } from 'react'

import { FullPageSpinner } from 'shared/components/lib';

import { useAuth } from 'context/AuthContext';

const UnAuthenticatedApp = lazy(() => import("./UnAuthenticatedApp"));
const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

function App() {
    const { user } = useAuth();
    console.log(user)
    return (
        <Suspense fallback={<FullPageSpinner />}>
            {
                user ? (
                    <AuthenticatedApp/>
                ) : <UnAuthenticatedApp />

            }
        </Suspense>
    )

}

export { App };