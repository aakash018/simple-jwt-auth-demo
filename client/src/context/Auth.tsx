import {createContext, useContext, useState} from 'react'

interface AuthType {
    login?: () => void;
}

const AuthContext = createContext<AuthType>({})

export const useAuth = ():AuthType => {
    return useContext(AuthContext)
}

const AuthProvider:React.FC = ({children}) => {

    const login = () => {
        console.log("Login")
    }


    const values: AuthType = {
        login
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
