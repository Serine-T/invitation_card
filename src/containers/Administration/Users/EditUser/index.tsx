import { memo, useState } from 'react';

import Typography from '@mui/material/Typography';
import PAGE_ROUTES from '@routes/routingEnum';
import BackButton from '@containers/common/BackButton';
import { ContentBox, StyledContainer, StyledBox } from '@containers/common/TitlesWithBackButton/styles';
import Button from '@containers/common/Button';
import confirmOptionsDialog from '@containers/common/Confirm';
import { useConfirm } from 'material-ui-confirm';
import { StyledStack } from '@containers/common/AddEditTablesStyles/styled';
import useMount from '@customHooks/useMount';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '@features/users/actions';
import { IUserInfo } from '@features/users/types';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';

import InputsTable from '../components/InputsTable';

const EditUser = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const { isLoading } = useAppSelector(selectUsers);

  useMount(() => {
    if (id) {
      dispatch(getUserById(id)).unwrap().then((data) => {
        setUserInfo(data);
      }).catch(() => navigate(PAGE_ROUTES.USERS));
    }
  });

  const handleDelete = async () => {
    try {
      await confirm(confirmOptionsDialog({ questionText: 'Are you sure you want to delete this user ?' }));
    } catch { }
  };

  if (isLoading) {
    return <Loader />;
  }

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
          { userInfo && <InputsTable userInfo={userInfo} />}
        </ContentBox>
      </StyledContainer>

    </>
  );
};

export default memo(EditUser);
