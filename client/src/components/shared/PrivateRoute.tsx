import {Route, Redirect} from "react-router-dom"
import { getToken } from "../../variables"

interface Props {
    component: any,
    path: any,
    exact: boolean,
}

const PrivateRoute:React.FC<Props> = ({component: Component,  ...rest}) => {

    return (
        <Route
        {...rest}
        render={props => (
            getToken()? <Component {...props}/> : <Redirect to="/login"/>
        )} />
    )
}

export default PrivateRoute
