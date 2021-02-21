import React from "react";
import { Avatar, Layout } from "antd";
import styled from "styled-components";
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export interface HeaderProps {
  className?: string;
  userUrl?: string;
  isMobile: boolean;
  isOpened: boolean;
  onMenuOpen?: () => void;
}
export const Header = styled(
  ({ className, userUrl, isMobile, isOpened, onMenuOpen }: HeaderProps) => {
    const MenuIcon = isOpened ? MenuUnfoldOutlined : MenuFoldOutlined;
    return (
      <Layout.Header className={className}>
        <picture className="company_name">
          <img src="/images/marimar-v2.png" alt="forklift" className="picture_image" />
        </picture>
        <div>
          {userUrl && <Avatar shape="square" size={45} icon={<UserOutlined />} src={userUrl} />}
          <picture className="forklift">
            <source srcSet="/images/wozek.webp" type="image/webp" />
            <source srcSet="/images/wozek.png" type="image/png" />
            <img src="/images/wozek.png" alt="forklift" className="picture_image" />
          </picture>
        </div>
        {isMobile && <MenuIcon onClick={onMenuOpen} style={{ fontSize: "5vh", color: "grey" }} />}
      </Layout.Header>
    );
  }
)`
  background-color: rgb(254, 243, 242);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
  flex-direction: row;

  @media (max-width: 600px) {
    padding: 0;
  }

  .logos {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .company_name {
    height: 3em;
    margin-bottom: auto;
  }

  .forklift {
    height: 3em;
  }

  .picture_image {
    height: inherit;
  }
`;

Header.defaultProps = {
  className: "",
};
