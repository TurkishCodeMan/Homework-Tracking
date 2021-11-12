import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import { QueryClientProvider } from "./QueryClient";


function AppProviders({ children }) {
    return (
        <QueryClientProvider>
            <Router>
                <AuthProvider>{children}</AuthProvider>
            </Router>
        </QueryClientProvider>
    )
}
export { AppProviders }
