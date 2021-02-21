import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ChoiceStatus } from '../../constants';

const buttonStyle = css`
  padding: 2px 4px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-color: #cbd5e0;
  color: #2d3748;
  font-weight: 600;
  background-color: #fff;
  margin: 5px;

  :disabled {
    opacity: 0.6;
  }
`;

const StyledButton = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))<{'data-testid'?:string}>`
  ${buttonStyle}
`;

type LinkedButtonProps =
{
  to: string,
  className?: string,
  disabled?: boolean,
  children: React.ReactNode,
  onClick?: () => {},
};

export const LinkButton = withRouter((
  props: RouteComponentProps
  & LinkedButtonProps,
) => {
  const {
    className,
    history,
    to,
    disabled,
    onClick,
    children,
  } = props;
  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        history.push(to);
      }}
    >
      {children}
    </Button>
  );
});

type ChoiceButtonType = {
  status: ChoiceStatus,
  disabled?: boolean,
}

export const ChoiceButton = styled(StyledButton)
  .attrs(({ status }: ChoiceButtonType) => ({
    bgColor: status,
    hbgColor: status === ChoiceStatus.NONE ? ChoiceStatus.HOVER : '',
  }))<ChoiceButtonType>`
  min-height: 50px;
  margin: 5px;
  background-color: ${({ bgColor }) => bgColor};
  font-weight: 400;
  display: flex;

  :disabled {
    opacity: unset;
  }

  :hover:enabled {
    background-color: ${({ hbgColor }) => hbgColor};
  }
`;

export const Submit = styled(Button)`
  font-size: large;
  padding: 10px;
  background: #00d402;
  margin: 5px;
  min-width: 150px;
`;
