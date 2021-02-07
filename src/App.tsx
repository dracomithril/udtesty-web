import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Header } from "./Header";

function App() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Layout.Content>Content</Layout.Content>
        <Layout.Sider>Sider</Layout.Sider>
      </Layout>
    </Layout>
  );
}

export default App;
