import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';

interface IInputsTable {
  title: string;
}

const InputsTable = ({ title }:IInputsTable) => {
  return (
    <>
      <TitlesWithBackButton title={title}>
        jrygfyug
      </TitlesWithBackButton>
    </>
  );
};

export default memo(InputsTable);
