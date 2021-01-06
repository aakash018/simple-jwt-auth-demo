/// <reference path="../variables.ts" />

import axios from 'axios'
import {createContext, useContext, useState} from 'react'
import { getToken, setToken } from '../variables'

interface UserTypes {
    username: string,
    password: string,
    id: string,
    email: string
}

interface AuthType {
    login?: (username: string, password: string) => void,
    currentUser?: UserTypes | undefined,
}


const AuthContext = createContext<AuthType>({})

export const useAuth = ():AuthType => {
    return useContext(AuthContext)
}


const AuthProvider:React.FC = ({children}) => {

    const [currentUser, setCurrentUser] = useState<UserTypes>()



    const login = (username: string, password: string) => {
        try {
            (async () => {
            // response = await axios.post("/api/login", {username, password});
            
            // TODO SAVE TOKEN LOCALSTORAGE
            // * SEND FROM BACKEND FIRST
            // * THEN SEND IN HEADER 
            // * PARSE HEADER AND USE... 
            // ! await axios.post("/api/login/jwt", {username, password})
                
            const {data: jwt_response} = await axios.post<{token: string}>("/api/login/jwt", {username, password})
            console.log(getToken())
            setToken(jwt_response.token)

            const {data: userData} = await axios.get<UserTypes>("/api/login/data", {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                } , 
                params: {
                    username: username
                }
            })

            setCurrentUser({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                id: userData.id,
            })
            })()
        } catch(e) {
            console.error(e)
        }
    }

    const values: AuthType = {
        login,
        currentUser
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
