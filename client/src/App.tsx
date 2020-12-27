import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Login from "./components/Login/index"
import {GlobalStyle} from "./components/shared/globalStyle.style"
import SignUp from "./components/SignUp";
function App() {
  return (
    <div className="App">
      <GlobalStyle />
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} ></Route>
            <Route path="/signup" exact component={SignUp} ></Route>
          </Switch>
        </Router>
          
    </div>
  );
}

export default App;
