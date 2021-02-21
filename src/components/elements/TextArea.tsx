import styled from 'styled-components';

const TextArea = styled.textarea`
  flex: 1;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid ${(props) => (!props.value ? 'red' : '#cbd5e0')};
  color: #2d3748;
  height: 64px;
`;

export default TextArea;
