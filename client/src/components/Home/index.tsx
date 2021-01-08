import axios from "axios"
import { useEffect } from "react"
import { Refresh_token } from "../../@types/user"
import { useAuth } from "../../context/Auth"
import { getExpiringDate, getToken, setExpiringToken, setToken } from "../../variables"

const Home = () => {

    const { currentUser } = useAuth()
    
    const handleClick = async () => {
        const data = await axios.get("/api/login/test-data", {
            headers: {
                'Authorization': `Basic ${getToken()}`
            }})
        console.log(data.data)
    }

    useEffect(() => {
        const refresh_token_Interval = setInterval(async () => {
            console.log("Go")
            const response = await axios.get<Refresh_token>("/api/login/refresh-token")
            setToken(response.data.token)
            setExpiringToken(response.data.expiringTime)
            console.log(getExpiringDate() * 1000)

        }, (getExpiringDate() * 1000 - 2000))

        return () => clearInterval(refresh_token_Interval)
    }, [])

    return (
        <div>
            Welcome {currentUser?.username}
            <button onClick={handleClick}>Click</button>
        </div>
    )
}

export default Home
