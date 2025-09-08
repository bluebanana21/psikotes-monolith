import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import AdminLayout from "../layouts/AdminLayout"; // biasanya plural "layouts"
import Dashboard from "../pages/admin/dashboard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/auth/login" element={<Login />} />

        {/* Admin layout + dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;