import { memo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { IBannerInfo } from '@features/banners/types';
import { selectBanners } from '@features/banners/selectors';
import useMount from '@customHooks/useMount';
import PAGE_ROUTES from '@routes/routingEnum';
import { getBannerById } from '@features/banners/actions';
import Loader from '@containers/common/Loader';

import InputsTable from '../components/InputsTable';

const EditBanner = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [bannersData, setBannersData] = useState<IBannerInfo | null>(null);
  const { isLoading } = useAppSelector(selectBanners);

  useMount(() => {
    dispatch(getBannerById(id as string)).unwrap().then((data) => {
      setBannersData(data);
    }).catch(() => navigate(PAGE_ROUTES.HOMEPAGE));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      { bannersData && <InputsTable bannersData={bannersData} />}
    </>

  );
};

export default memo(EditBanner);
