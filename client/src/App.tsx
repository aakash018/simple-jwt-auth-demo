import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./components/Home";

import Login from "./components/Login/index"
import {GlobalStyle} from "./components/shared/globalStyle.style"
import PrivateRoute from "./components/shared/PrivateRoute";
import SignUp from "./components/SignUp";
import AuthProvider from "./context/Auth";
function App() {
  return (
    <div className="App">
      <GlobalStyle />
        <Router>
          <Switch>
            <AuthProvider>
            <PrivateRoute component={Home} path="/" exact={true}/>
            <Route path="/login" exact component={Login} ></Route>
            <Route path="/signup" exact component={SignUp} ></Route>
            </AuthProvider>
          </Switch>
        </Router>
          
    </div>
  );
}

export default App;
