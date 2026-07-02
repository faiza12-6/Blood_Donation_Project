import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Patients from "./pages/Patients";
import Donors from "./pages/Donors";
import Donations from "./pages/Donations";
import Reports from "./pages/Reports";
import About from "./pages/About";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* REDIRECT (optional safety) */}
        <Route path="/home" element={<Navigate to="/" />} />

        {/* PROTECTED PAGES */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <Layout>
                <Patients />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/donors"
          element={
            <PrivateRoute>
              <Layout>
                <Donors />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <PrivateRoute>
              <Layout>
                <Donations />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Layout>
                <Reports />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Layout>
                <About />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h1>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;