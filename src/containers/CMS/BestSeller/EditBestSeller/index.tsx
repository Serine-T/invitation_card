import { memo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getBestSellerById } from '@features/bestSellers/actions';
import PAGE_ROUTES from '@routes/routingEnum';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import { selectBestSellers } from '@features/bestSellers/selectors';
import { IBestSellerInfo } from '@features/bestSellers/types';
import { getAllSubcategories } from '@features/subcategories/actions';
import { selectSubcategories } from '@features/subcategories/selectors';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from '../components/InputsTable';

const EditBestSeller = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [bestSellerData, setBestSellerData] = useState<IBestSellerInfo | null>(null);
  const { isLoading } = useAppSelector(selectBestSellers);
  const { isLoading: subcategoriesLoading, data: subcategories } = useAppSelector(selectSubcategories);

  useMount(() => {
    dispatch(getBestSellerById(id as string)).unwrap().then((data) => {
      setBestSellerData(data);
    }).catch(() => navigate(PAGE_ROUTES.BEST_SELLER));

    dispatch(getAllSubcategories());
  });

  if (isLoading || subcategoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      {(subcategories.length && bestSellerData) ? (
        <InputsTable bestSellerData={bestSellerData} />) : (
          <EmptyState text="You don’t have any subcategories, please add new to proceed" />
      )}
    </>
  );
};

export default memo(EditBestSeller);
