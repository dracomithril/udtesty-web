import styled from 'styled-components';
import React, { useState } from 'react';

const ImageFromFile = styled((
  { file, alt, className }:
  { file?: File, className?: string, alt?: string },
) => {
  const [source, setSource] = useState<string>();
  if (!file) {
    return null;
  }
  const reader = new FileReader();
  reader.onloadend = function loadImage({ target }) {
    if (target && target.result && typeof target.result === 'string') {
      setSource(target.result);
    }
  };
  reader.readAsDataURL(file);
  return <img className={className} alt={alt || 'not set'} src={source} />;
})`
  height: 200px;
  align-self: center;
`;

export default ImageFromFile;
