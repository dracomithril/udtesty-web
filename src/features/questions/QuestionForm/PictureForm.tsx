import styled from 'styled-components';
import React from 'react';
import { Checkbox } from 'antd';
import { PictureType } from '@dracomithril/types';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

function convertToKB(file?: File) {
  if (!file) return 0;
  return Math.round(file.size / 1024);
}

export const translations = {
  description: 'opis',
  picture: 'Zdjęcie:',
  noResize: 'bez powiększenia',
};

const SizeLabel = styled.span.attrs(({ size }:{size:number}) => ({
  color: size < 1e3 ? 'green' : 'red',
}))<{ size: number }>`
  color: ${(props) => props.color};
`;
type FileSizeProps = { file?: File, className?: string };
const FileSize = ({ file, className }: FileSizeProps) => {
  if (!file) {
    return null;
  }
  const value = convertToKB(file);
  return (
    <SizeLabel
      size={value}
      className={className}
    >
      {`${value} KB`}
    </SizeLabel>
  );
};

export type PictureFormChangeType = { value: PictureType };

const PictureForm = styled(({
  picture, selectedTestId, className, onChange,
}:
{
  picture: PictureType,
  className?: string,
  selectedTestId?: string,
  onChange: ({ value }:PictureFormChangeType)=> void,
}) => {
  const { alt, file, noResize } = picture;
  const handleFileChange = ({ currentTarget }:React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = currentTarget;
    if (!files) return;
    const fileChange = (value?: File) => {
      onChange({
        value: {
          ...picture,
          file: value,
        },
      });
    };
    if (!files.length) {
      fileChange();
      return;
    }
    const newFile = files.item(0);
    if (newFile) {
      fileChange(newFile);
    }
  };

  const handleAltChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: {
        ...picture,
        alt: currentTarget.value,
      },
    });
  };

  const handleNoResizeChange = ({ target }: CheckboxChangeEvent) => {
    onChange({
      value: {
        ...picture,
        noResize: target.checked,
      },
    });
  };
  return (
    <div className={className}>
      <label htmlFor="pictureUrl">
        {translations.picture}
        <input
          id="pictureUrl"
          type="file"
          name="file"
          accept="image/png, image/jpeg"
          disabled={!selectedTestId}
          onAbort={handleFileChange}
          onChange={handleFileChange}
        />
      </label>
      <FileSize file={file} />
      <Checkbox
        defaultChecked={false}
        checked={noResize}
        onChange={handleNoResizeChange}
      >
        {translations.noResize}
      </Checkbox>
      <label htmlFor="pictureDescription">
        {translations.description}
        <input
          id="pictureDescription"
          type="text"
          name="alt"
          disabled={!selectedTestId}
          value={alt}
          onChange={handleAltChange}
        />
      </label>
    </div>
  );
})`
  display: flex;
  flex-flow: column;

  input {
    margin-left: 5px;
  }
`;

FileSize.defaultProps = {
  className: '',
  file: undefined,
};

export default PictureForm;
