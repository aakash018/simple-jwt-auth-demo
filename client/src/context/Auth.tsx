import axios from 'axios'
import {createContext, useContext, useState} from 'react'

interface UserTypes {
    username: string,
    password: string,
    id: string,
    email: string
}

interface AuthType {
    login?: (username: string, password: string) => void,
    currentUser?: UserTypes | undefined
}


const AuthContext = createContext<AuthType>({})

export const useAuth = ():AuthType => {
    return useContext(AuthContext)
}


const AuthProvider:React.FC = ({children}) => {

    const [currentUser, setCurrentUser] = useState<UserTypes>()



    const login = (username: string, password: string) => {
        try {
            let response;
            (async () => {
            response = await axios.post("/api/login", {username, password});
            setCurrentUser({
                username: response.data.username,
                email: response.data.email,
                password: response.data.password,
                id: response.data.id
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
