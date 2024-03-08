
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import { AuthProvider } from './Context';
import { useAuth } from './Context/useAuth';
import RequireAuth from './RequireAuth';
import SignUp from './components/Signup/Signup';
import Login from './components/Login/Login';
function App() {

  const auth = useAuth()
  console.log(auth)
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Switch> */}
          <Route element={<RequireAuth />}>
            <Route
              exact
              path="/home"
              element={<Home />}
            ></Route>
          </Route>

          <Route path="/" element={<Navigate replace to="/home" />} />

          <Route
            exact
            path="/about"
            element={<About />}
          ></Route>
          
          <Route
            exact
            path="/login"
            element={<Login />}
          ></Route>
          
          <Route
            exact
            path="/signup"
            element={<SignUp />}
          ></Route>

          <Route element={<RequireAuth />}>
            <Route
              exact
              path="/contact"
              element={<Contact />}
            ></Route>
          </Route>
          {/* </Switch> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
