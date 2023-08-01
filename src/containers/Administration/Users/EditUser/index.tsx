import { memo } from 'react';

import Typography from '@mui/material/Typography';
import PAGE_ROUTES from '@routes/routingEnum';
import BackButton from '@containers/common/BackButton';
import { ContentBox, StyledContainer, StyledBox } from '@containers/common/TitlesWithBackButton/styles';
import Button from '@containers/common/Button';
import confirmOptionsDialog from '@containers/common/Confirm';
import { useConfirm } from 'material-ui-confirm';

import InputsTable from '../components/InputsTable';
import { StyledStack } from '../components/styles';

const EditUser = () => {
  const confirm = useConfirm();
  const handleDelete = async () => {
    try {
      await confirm(confirmOptionsDialog({ questionText: 'Are you sure you want to delete this user ?' }));
    } catch { }
  };

  return (
    <>
      <StyledContainer>
        <StyledBox>
          <BackButton path={PAGE_ROUTES.USERS} />
        </StyledBox>
        <ContentBox>
          <StyledStack direction="row" justifyContent="space-between">
            <Typography variant="h2" mb="40px">Edit User</Typography>
            <Button width="120px" onClick={handleDelete}>Delete</Button>
          </StyledStack>
          <InputsTable />
        </ContentBox>
      </StyledContainer>

    </>
  );
};

export default memo(EditUser);
