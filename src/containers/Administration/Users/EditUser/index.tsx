import { memo, useEffect, useState } from 'react';

import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '@features/users/actions';
import { IUserInfo } from '@features/users/types';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import { selectAuth } from '@features/auth/selectors';

import InputsTable from '../components/InputsTable';

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const { isLoading } = useAppSelector(selectUsers);
  const { accessToken } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(getUserById(id as string)).unwrap().then((data) => {
      setUserInfo(data);
    }).catch(() => navigate(PAGE_ROUTES.USERS));
  }, [dispatch, accessToken, id, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      { userInfo && <InputsTable userInfo={userInfo} />}
    </>
  );
};

export default memo(EditUser);
