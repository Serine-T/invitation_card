import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import PageTitle from '@containers/common/PageTitle';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectBanners } from '@features/banners/selectors';
import useMount from '@customHooks/useMount';
import { getAllBanners } from '@features/banners/actions';
import Loader from '@containers/common/Loader';
import EmptyState from '@containers/common/EmptyState';

import Banners from './components/Banners';

const Homepage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleAddBanner = () => navigate(PAGE_ROUTES.ADD_BANNER);

  const { isLoading, banners, sliders } = useAppSelector(selectBanners);

  useMount(() => {
    dispatch(getAllBanners());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Homepage" btnName="Add Banner" handleAdd={handleAddBanner} />
      {!!sliders.length && <Banners isSlider />}
      {!!banners.length && <Banners />}
      {!sliders.length && !banners.length && (
        <EmptyState text="You don’t have any banners, please add new to proceed" />)}
    </>
  );
};

export default memo(Homepage);
