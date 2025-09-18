import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManageStatus from "./Components/ManageStatus"
import Navbar from "./Components/navbar"
import ManageTask from "./Components/ManageTask";
import ManagePriority from "./Components/ManagePriority";
import ManageRole from "./Components/ManageRole";
import ManageUser from "./Components/ManageUser";
import Login from "./Components/Login";
import Register from "./Components/Register";
function App() {
  return (
    <>
    <Router>
    <Navbar>
    <Routes>
        <Route path="/" element={<ManageTask/>} />
        <Route path="/Managestatus" element={<ManageStatus/>} />
        <Route path="/Managepriority" element={<ManagePriority/>} />
        <Route path="/Managerole" element={<ManageRole/>} />
        <Route path="/Manageusers" element={<ManageUser/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
    </Routes>
    </Navbar>
    </Router>
    </>
  )
}

export default App