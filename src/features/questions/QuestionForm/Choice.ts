import styled from 'styled-components';

type ChoiceType = {
  selected?: boolean;
  odd?: boolean
};

const colors = {
  selected: '#83c19373',
  odd: '#c3c3c336',
  none: 'none',
};

const getChoiceBGColor = ({ selected, odd }:ChoiceType) => {
  if (selected) return colors.selected;
  if (odd) return colors.odd;
  return colors.none;
};

const Choice = styled.div.attrs((props:{selected:boolean}) => ({
  border: props.selected ? '1px solid green' : '1px solid #c3dad0',
  bgColor: getChoiceBGColor(props),
}))<ChoiceType>`
  border: ${(props) => props.border};
  background-color: ${(props) => props.bgColor};
  border-radius: 4px;
  display: flex;
  padding: 10px;
  flex-flow: column;
  margin: 10px 0;
`;

export default Choice;
