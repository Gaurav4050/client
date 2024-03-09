
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Home from './components/Home/Home';
import { AuthProvider } from './Context';
import RequireAuth from './RequireAuth';
import SignUp from './components/Signup/Signup';
import Login from './components/Login/Login';
import toast, { Toaster } from 'react-hot-toast';
function App() {


  return (
    <AuthProvider>
      <Toaster />
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
            path="/login"
            element={<Login />}
          ></Route>
          
          <Route
            exact
            path="/signup"
            element={<SignUp />}
          ></Route>

          
          {/* </Switch> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
