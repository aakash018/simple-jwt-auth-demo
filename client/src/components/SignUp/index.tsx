import Input from "../shared/Input"
import Btn from "../shared/Btn"
import axios from "axios"

import { useState } from "react"
import { Container } from "../shared/MainForm/contianer.style"
import { Form } from "../shared/MainForm/form.style"
import { Wraper } from "../shared/MainForm/wraper.style"
import { AdditionalText } from "../shared/MainForm/AdditionalText.style"
import { Link } from "react-router-dom"

const SignUp:React.FC = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        // TODO: Add Input Filter

        axios
            .post("api/signup", {username, password, email})
    }


    return (
        <Wraper>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" onChange={setUsername} placeholder="Username" />
                    <Input type="password" onChange={setPassword} placeholder="Password" />
                    <Input type="password" onChange={setConfirmPass} placeholder="Confirm Password" />
                    <Input type="email" onChange={setEmail} placeholder="Email" />
                    <section style={{marginTop: "30px"}}>
                        <Btn type="submit" width="300px" styleType="primary">Submit</Btn>
                    </section>
                </Form>
                <AdditionalText>
                    Already Have Account! <Link to="/login">Login</Link>
                </AdditionalText>
            </Container>
        </Wraper>
    )
}

export default SignUp