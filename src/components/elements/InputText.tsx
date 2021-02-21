import React from 'react';
import styled from 'styled-components';

interface InputTextPropType {
  className?: string;
  id?: string;
  value?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  className = '',
  id,
  label,
  value,
  onChange,
}: InputTextPropType) => (
  <label
    data-testid={`${id}.label`}
    className={className}
    htmlFor={id}
  >
    {label}
    <input
      id={id}
      data-testid={`${id}.input`}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

InputText.defaultProps = {
  className: '',
  id: 'inputText',
  value: '',
  onChange: () => {},
  label: '',
};

export default styled(InputText)`
  input {
    border: 1px #000 solid;
    border-radius: 4px;
  }
`;
