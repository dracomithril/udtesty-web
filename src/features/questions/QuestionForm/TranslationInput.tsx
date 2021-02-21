import styled from 'styled-components';
import React, { ChangeEvent } from 'react';
import { Input, Form } from 'antd';

export const TRANSLATION_INPUT_TEXTAREA = 'translation-input-textarea';
export const TRANSLATION_INPUT = 'translation_input';
const TranslationInput = styled(({
  label, name, value, onChange, className, disabled, needed, ...props
}: {
  label: string,
  name: string,
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  value: string,
  needed?: boolean;
  'data-testid'?:string;
  className?: string;
  hidden?: boolean;
}) => {
  const hasError = !value && needed;

  return (
    <Form.Item
      label={label}
      required={needed}
      validateStatus={hasError ? 'error' : undefined}
      help={hasError ? 'nie powinno byc puste' : ''}
      className={className}
      data-testid={props['data-testid'] || TRANSLATION_INPUT}
    >
      <Input.TextArea
        disabled={disabled}
        data-testid={TRANSLATION_INPUT_TEXTAREA}
        name={name}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
  );
}).attrs((props) => ({ fontWeight: props.needed ? 'bold' : 'unset' }))`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  flex-direction: row;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
`;

export default TranslationInput;
