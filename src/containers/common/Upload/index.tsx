import { ChangeEvent, FC, memo, ReactNode } from 'react';

import { StyledInput, StyledInputLabel } from './styled';

interface IUploadProps {
  id: string;
  beforeUpload?: (files: FileList) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  name?: string;
}

const Upload: FC<IUploadProps> = ({
  id,
  onChange,
  children,
  name = '',
  beforeUpload,
}: IUploadProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      (async () => {
        await beforeUpload?.(e.target.files as FileList);

        onChange?.(e);
      })();
    }
  };

  return (
    <StyledInputLabel htmlFor={id}>
      <StyledInput
        id={id}
        type="file"
        onChange={handleChange}
        accept=".jpg, .jpeg, .png"
        name={name}
      />
      {children}
    </StyledInputLabel>
  );
};

export default memo(Upload);
