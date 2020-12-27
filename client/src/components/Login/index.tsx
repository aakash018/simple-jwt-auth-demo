import { useState } from "react"
import Btn from "../shared/Btn"
import Input from "../shared/Input"
import { Container } from "./contianer.style"
import { Form } from "./form.style"
import { Wraper } from "./wraper.style"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log(username, password)
    }

    return (
        <>
            <Wraper>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Input type="text" onChange={setUsername} placeholder="Username"/>
                        <Input type="password" onChange={setPassword} placeholder="Password" />
                        <Btn type="submit" width="300px">Login</Btn>
                    </Form>
                </Container>
            </Wraper>
        </>
    )
}

export default Login
