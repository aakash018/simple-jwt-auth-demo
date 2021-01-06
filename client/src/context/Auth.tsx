/// <reference path="../variables.ts" />

import axios, { AxiosResponse } from 'axios'
import {createContext, useContext, useState} from 'react'
import { getToken, setToken } from '../variables'

interface UserTypes {
    username: string,
    password: string,
    id: string,
    email: string
}

interface AuthType {
    login?: (username: string, password: string) => Promise<AxiosResponse<UserTypes>>
    currentUser?: UserTypes | undefined,
    setCurrentUser?: React.Dispatch<React.SetStateAction<UserTypes | undefined>>
}


const AuthContext = createContext<AuthType>({})

export const useAuth = ():AuthType => {
    return useContext(AuthContext)
}


const AuthProvider:React.FC = ({children}) => {

    const [currentUser, setCurrentUser] = useState<UserTypes>()

    const login = async (username: string, password: string) => {                         
            const {data: jwt_response} = await axios.post<{token: string}>("/api/login/jwt", {username, password})
            console.log(jwt_response) 
            setToken(jwt_response.token)
            return axios.get<UserTypes>("/api/login/data", {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                } , 
                params: {
                    username: username
                }
            })    
    }
    const values: AuthType = {
        login,
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
