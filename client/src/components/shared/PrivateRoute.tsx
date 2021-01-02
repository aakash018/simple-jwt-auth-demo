import {Route, Redirect} from "react-router-dom"
import { useAuth } from "../../context/Auth"

interface Props {
    component: any,
    path: any,
    exact: boolean,
}

const PrivateRoute:React.FC<Props> = ({component: Component,  ...rest}) => {

    const {currentUser} = useAuth()

    return (
        <Route
        {...rest}
        render={props => (
            currentUser? <Component {...props}/> : <Redirect to="/login"/>
        )} />
    )
}

export default PrivateRoute
