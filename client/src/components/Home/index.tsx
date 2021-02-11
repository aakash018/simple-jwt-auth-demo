import axios from "axios"
import { useEffect } from "react"
import { Refresh_token } from "../../@types/user"
import { useAuth } from "../../context/Auth"
import { getExpiringDate, getToken, setExpiringToken, setToken } from "../../variables"

const Home = () => {

    const { currentUser } = useAuth()
    
    const handleClick = async () => {
        const data = await axios.get("/api/post/my_post",  {
            headers: {
                'Authorization': `Basic ${getToken()}`
            },
            params: { name: currentUser?.username }
            
        })
        console.log(data.data)
    }

    useEffect(() => {
            setInterval(async () => {
            console.log("Go")
            const response = await axios.get<Refresh_token>("/api/login/refresh-token")
            setToken(response.data.token)
            setExpiringToken(response.data.expiringTime)
            console.log(getExpiringDate() * 1000)

        }, (getExpiringDate() * 1000 - 2000))

    }, [])

    return (
        <div>
            Welcome {currentUser?.username}
            <button onClick={handleClick}>Click</button>
        </div>
    )
}

export default Home
