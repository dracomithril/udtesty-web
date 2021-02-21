import styled from 'styled-components';
import { PictureType } from '@dracomithril/types';
import React from 'react';

const QuestionPicture = styled((
  {
    data,
    className,
  }: { data: PictureType, className?: string },
) => (
  <picture className={className}>
    <img src={data.href} alt={data.alt} />
  </picture>
))`
  img {
    max-height: 40vh;
    max-width: 100%;
    min-height: 100px;
    min-width: 100px;
    background: url(https://via.placeholder.com/150.webp) no-repeat scroll 0 0;
  }
`;

export default QuestionPicture;
