import React from "react";
import { Avatar, Layout } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";

export const Header = styled(({ className, userUrl }: { className?: string, userUrl?: string }) => (
  <Layout.Header className={className}>
    <div className="logos">
      <picture className="company_name">
        <img src="/images/marimar-v2.png" alt="forklift" className="picture_image" />
      </picture>
      <div>
        <Avatar shape="square" size={45} icon={<UserOutlined />} src={userUrl} />
        <picture className="forklift">
          <source srcSet="/images/wozek.webp" type="image/webp" />
          <source srcSet="/images/wozek.png" type="image/png" />
          <img src="/images/wozek.png" alt="forklift" className="picture_image" />
        </picture>
      </div>
    </div>
  </Layout.Header>
))`
  background-color: rgb(254, 243, 242);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  .logos {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .company_name {
    height: 7vh;
    margin-bottom: auto;
  }

  .forklift {
    height: 5vh;
  }

  .picture_image {
    height: inherit;
  }
`;

Header.defaultProps = {
  className: "",
};
