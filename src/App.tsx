import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import "./i18n";
import AppLayout from "./AppLayout";
import RootRoutes from "./routes/RootRoutes";

function App() {
  return (
    <Router>
      <AppLayout >
        <RootRoutes />
      </AppLayout>
    </Router>
  );
}

export default App;

