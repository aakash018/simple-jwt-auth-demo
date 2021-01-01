import {createContext, useContext, useState} from 'react'

interface AuthType {
    login?: () => void;
}

interface test {
    hi: string
}

const AuthContext = createContext<AuthType>({})

export const useAuth = ():AuthType => {
    return useContext(AuthContext)
}

export const test = (): test => {
    return {
        hi: "Yooo"
    }
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
