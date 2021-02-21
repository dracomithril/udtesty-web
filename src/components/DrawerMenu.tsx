import styled from "styled-components";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import { menuMappings } from "../routes/access";
import { HOME, POLICY_COOKIE } from "../routes/routes";
import { HomeFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const StyledMenu = styled(Menu)`
  &.menu {
    border-style: none;
  }
`;

type Links = Record<string, string[]>;
type DrowerMenuPropsType = { className?: string; links: Links; onClick?: () => void };

const DrawerMenu = ({
  className = "",
  links,
  onClick,
}: DrowerMenuPropsType) => {
  const history = useHistory();
  const { t } = useTranslation()
  const menuElements2 = Object.entries(links).map(([name, group]) => (
    <Menu.ItemGroup key={name} title={t(`menu.groups.${name}`)}>
      <Menu.Divider />
      {group.map((route) => {
        const menuMapping = menuMappings.get(route);
        return (
          <Menu.Item
            key={route}
            data-testid={menuMapping?.id}
            onClick={() => {
              history.push(route);
              onClick?.();
            }}
          >
            {t(menuMapping?.translationPath || "")}
          </Menu.Item>
        );
      })}
    </Menu.ItemGroup>
  ));
  const home = menuMappings.get(HOME);
  const cookiePolice = menuMappings.get(POLICY_COOKIE);
  return (
    <StyledMenu className={`${className} menu`} mode="inline">
      <Menu.Item
        data-testid={home?.id}
        onClick={() => {
          history.push(HOME);
          onClick?.();
        }}
      >
        <HomeFilled />
        {t(home?.translationPath || "")}
      </Menu.Item>
      {menuElements2}
      <Menu.Divider />
      <Menu.Item
        data-testid={cookiePolice?.id}
        onClick={() => {
          history.push(POLICY_COOKIE);
          onClick?.();
        }}
      >
        {t(cookiePolice?.translationPath || "")}
      </Menu.Item>
    </StyledMenu>
  );
};

export default DrawerMenu;
