import { useAuth } from "../../context/Auth"

const Home = () => {

    const { currentUser } = useAuth()

    return (
        <div>
            Welcome {currentUser?.username}
        </div>
    )
}

export default Home
