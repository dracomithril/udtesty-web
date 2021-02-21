import React, { useState } from "react";
import { Drawer, Layout } from "antd";
import styled from "styled-components";
import { UserAccess } from "@dracomithril/types";
import { Header } from "./Header";
import DrawerMenu from "./components/DrawerMenu";
import { getLinks } from "./routes/access";
import { useMedia } from "./hooks";

interface AppLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

const AppLayout: React.VFC<AppLayoutProps> = styled(({ className, children }: AppLayoutProps) => {
  const isMobile = useMedia(["(max-width: 600px)"], [true], false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Layout className={className}>
      <Header
        isMobile={isMobile}
        isOpened={showMenu}
        onMenuOpen={() => {
          setShowMenu(!showMenu);
        }}
      />
      <Layout className="below">
        <Layout.Content className="content">{children}</Layout.Content>
        {isMobile && (
          <Drawer placement={"right"} visible={showMenu} onClose={()=>{
            setShowMenu(false);
          }}>
            <DrawerMenu links={getLinks(UserAccess.ADMIN)} />
          </Drawer>
        )}
        {!isMobile && (
          <Layout.Sider>
            <DrawerMenu links={getLinks(UserAccess.ADMIN)} />
          </Layout.Sider>
        )}
      </Layout>
    </Layout>
  );
})`
  .below {
    height: 90vh;
  }
  .content {
    background-color: #fff;
    display: flex;
    justify-content: center;
  }
`;

export default AppLayout;
