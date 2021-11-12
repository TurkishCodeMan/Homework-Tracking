import React from "react"
import { useQueryClient } from "react-query"
import { FullPageSpinner } from "shared/components/lib"
import { useAsync } from "shared/hooks/useAsync"
import { client } from "utils/api-client"
import * as authProvider from "utils/auth-provider"

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

function AuthProvider(props) {
    const {
        data: user,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        run,
        setData,
    } = useAsync()
    const queryClient = useQueryClient();

    const login = React.useCallback(
        form => authProvider.login(form).then(user => setData(user)),
        [setData],
      )
      const register = React.useCallback(
        form => authProvider.register(form).then(user => setData(user)),
        [setData],
      )
      const logout = React.useCallback(() => {
        authProvider.logout()
        queryClient.clear()
        setData(null)
      }, [setData, queryClient])
    
      const type=React.useMemo(()=>{
        return (user?.password==="admin" && user?.name==="admin")
          ?'admin'
          :authProvider.getToken().type==='0'
          ?'student'
          :'teacher'
      },[user])


      const isAdmin=React.useMemo(()=>type==='admin',[type])
      const isTeacher=React.useMemo(()=>type==='teacher',[type])
      const isStudent=React.useMemo(()=>type==='student',[type])

      const value = React.useMemo(
        () => ({ user,isAdmin,isTeacher,isStudent, login, logout, register }),
        [login, logout, register, user,isAdmin,isTeacher,isStudent],
      )
    


    React.useEffect(() => {
        run(new Promise(res => setTimeout(() => res(authProvider.getUser()), 2000)))
    }, [run])


    if (isLoading || isIdle) {
        return <FullPageSpinner />
      }
    
      if (isError) {
        authProvider.logout()
        return <h2>Error</h2>
      }
    
      if (isSuccess) {
        return <AuthContext.Provider value={value} {...props} />
      }
    
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error(`useAuth must be used within a AuthProvider`);
    }
    return context;
}

function useClient() {
    const token = authProvider.getToken();
    return React.useCallback((endpoint, config) =>
        client(endpoint, { ...config, token }),
        [token]
    )
}

export {AuthProvider,useAuth,useClient}