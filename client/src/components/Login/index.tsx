import { useState } from "react"
import { Link } from "react-router-dom"
import Btn from "../shared/Btn"
import Input from "../shared/Input"
import { AdditionalText } from "../shared/MainForm/AdditionalText.style"
import { Container } from "../shared/MainForm/contianer.style"
import { Form } from "../shared/MainForm/form.style"
import { Wraper } from "../shared/MainForm/wraper.style"


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
