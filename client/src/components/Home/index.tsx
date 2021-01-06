import { useAuth } from "../../context/Auth"

const Home = () => {

    const { currentUser } = useAuth()
    
    const handleClick = async () => {
        console.log(currentUser)
    }

    return (
        <div>
            Welcome {currentUser?.username}
            <button onClick={handleClick}>Click</button>
        </div>
    )
}

export default Home
