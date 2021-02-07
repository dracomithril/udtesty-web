import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

export const Header = styled(({ className }: { className?: string }) => (
  <Layout.Header className={className}>
    <div className="logos">
      <picture className="company_name">
        <source srcSet="/images/marimar_napis.png" type="image/png" />
        <img src="/images/marimar_napis.png" alt="forklift" className="picture_image" />
      </picture>
      <picture className="forklift">
        <source srcSet="/images/wozek.webp" type="image/webp" />
        <source srcSet="/images/wozek.png" type="image/png" />
        <img src="/images/wozek.png" alt="forklift" className="picture_image" />
      </picture>
    </div>
  </Layout.Header>
))`
  background-color: rgb(254, 243, 242);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .logos {
    min-height: 10vh;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .company_name {
    height: 38px;
  }

  .forklift {
    height: 10vh;
  }

  .picture_image {
    height: inherit;
  }
`;

Header.defaultProps = {
  className: "",
};
