import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Login } from "./Pages/Login";
import { Navbar } from "./Components/Navbar";
import { CreatePost } from "./Pages/Posts/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
