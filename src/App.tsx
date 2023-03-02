import "./App.scss";
import Layouts from "./components/layouts/layouts";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/pages/login/login";
import { useEffect } from "react";
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("Token")) {
            navigate("/layout");
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/layout" element={<Layouts />} />
            </Routes>
        </div>
    );
}

export default App;
