
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../context/Auth"
import { getToken } from "../../variables"
import Btn from "../shared/Btn"
import Input from "../shared/Input"
import { AdditionalText } from "../shared/MainForm/AdditionalText.style"
import { Container } from "../shared/MainForm/contianer.style"
import { Form } from "../shared/MainForm/form.style"
import { Wraper } from "../shared/MainForm/wraper.style"


const Login = () => {
    const {login, setCurrentUser} = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        if(username === "" || password === ""){
            return console.log("Error")
        }

        if(login){
            const userdata = await login(username, password);
            console.log(userdata)
            if(setCurrentUser){
                setCurrentUser({
                    username: userdata.data.username,
                    password: userdata.data.password,
                    id: userdata.data.id,
                    email: userdata.data.email
                })
            }
            if(userdata){
                history.push("/")
            }
        }
    }
    return (
        <>
            <Wraper>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Input type="text" onChange={setUsername} placeholder="Username"/>
                        <Input type="password" onChange={setPassword} placeholder="Password" />
                        <section style={{marginTop: "30px"}}>
                            <Btn type="submit" width="300px" styleType="primary">Login</Btn>
                        </section>
                    </Form>
                    <AdditionalText >
                        Don't Have Account!<Link to="/signup">SignUp</Link>
                    </AdditionalText>
                </Container>
            </Wraper>
        </>
    )
}

export default Login
