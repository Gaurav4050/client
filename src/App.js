
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
function App() {
  return (
    <Router>
        <Routes>
            <Route
                exact
                path="/"
                element={<Home />}
            ></Route>
            <Route
                exact
                path="/about"
                element={<About />}
            ></Route>
            <Route
                exact
                path="/contact"
                element={<Contact />}
            ></Route>
        </Routes>
</Router>
  );
}

export default App;
