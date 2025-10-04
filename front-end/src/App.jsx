import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ManageStatus from "./Components/ManageStatus";
import ManageTask from "./Components/ManageTask";
import ManagePriority from "./Components/ManagePriority";
import ManageRole from "./Components/ManageRole";
import ManageUser from "./Components/ManageUser";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PrivateRoute from "./Components/PrivateRoute";
import Unauthorized from "./Components/Unauthorized";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages outside Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Layout with Navbar + Sidebar */}
        <Route element={<Navbar />}>
          {/* USER → only ManageTask */}
          <Route
            path="/"
            element={
              <PrivateRoute roles={["user", "admin", "superadmin"]}>
                <ManageTask />
              </PrivateRoute>
            }
          />

          {/* ADMIN → ManageStatus & ManagePriority */}
          <Route
            path="/managestatus"
            element={
              <PrivateRoute roles={["admin", "superadmin"]}>
                <ManageStatus />
              </PrivateRoute>
            }
          />
          <Route
            path="/managepriority"
            element={
              <PrivateRoute roles={["admin", "superadmin"]}>
                <ManagePriority />
              </PrivateRoute>
            }
          />

          {/* SUPERADMIN → ManageRole & ManageUser */}
          <Route
            path="/managerole"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <ManageRole />
              </PrivateRoute>
            }
          />
          <Route
            path="/manageusers"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <ManageUser />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
