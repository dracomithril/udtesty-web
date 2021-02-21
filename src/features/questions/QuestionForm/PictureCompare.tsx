import { PictureType } from '@dracomithril/types';
import React from 'react';
import styled from 'styled-components';
import ImageFromFile from './ImageFromFile';

function PictureCompare({ picture, className }: { picture: PictureType, className?: string }) {
  return (
    <div className={className}>
      {picture.href && <img className="image" src={picture.href} alt={picture.alt} />}
      {picture.href && picture.file && <span className="arrow">➡</span>}
      {picture.file && <ImageFromFile className="image" file={picture.file} alt={picture.alt} />}
    </div>
  );
}

PictureCompare.defaultProps = {
  className: '',
};

export default styled(PictureCompare)`
  display: flex;
  align-items: center;

  .image {
    height: 200px;
  }

  .arrow {
    color: red;
    font-size: xx-large;
  }
`;
