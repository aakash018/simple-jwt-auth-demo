/// <reference path="../variables.ts" />

import axios, { AxiosResponse } from 'axios'
import {createContext, useContext, useState} from 'react'
import { UserTypes } from '../@types/user'
import { getToken, setExpiringToken, setToken } from '../variables'


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
            const {data: jwt_response} = await axios.post<{token: string, expiringTime: number}>("/api/login/jwt", {username, password})
            setToken(jwt_response.token)
            setExpiringToken(jwt_response.expiringTime)
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
