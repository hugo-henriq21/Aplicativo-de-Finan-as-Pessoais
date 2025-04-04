import { Routes, Route } from "react-router-dom";

import DashBoard from "../pages/DashBoard";
import Lista from "../pages/Lista";
import Layout from "../components/Layout/Layout";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/lista/:type" element={<Lista />} />
      </Routes>
    </Layout>
  );
}
