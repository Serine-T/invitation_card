import { ChangeEvent, DragEvent, FC, memo, ReactNode } from 'react';

import { StyledInput } from './styled';

interface IUploadProps {
  id: string;
  beforeUpload?: (files: FileList) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: DragEvent<HTMLInputElement>) => void;
  handleDragOver: (event: DragEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  name?: string;
}

const Upload: FC<IUploadProps> = ({
  id,
  onChange,
  children,
  name = '',
  beforeUpload,
  handleDrop,
  handleDragOver,
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
    <>
      <StyledInput
        id={id}
        type="file"
        onChange={handleChange}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        accept=".jpg, .jpeg, .png"
        name={name}
      />
      {children}
    </>
  );
};

export default memo(Upload);
