import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";
import TeacherStudens from "./pages/teacherStudens";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="teacherstudents/:idStudents" element={<TeacherStudens />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
