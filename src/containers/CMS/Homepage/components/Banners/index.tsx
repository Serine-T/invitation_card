import { memo } from 'react';

import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import TableCell from '@mui/material/TableCell';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import StyledTable from '@containers/common/Table';
import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectBanners } from '@features/banners/selectors';
import { setBanners, setSilders } from '@features/banners/slice';
import Loader from '@containers/common/Loader';
import { deleteBanner, getAllBanners, reorderBanners } from '@features/banners/actions';
import RowTitle from '@containers/common/Table/components/RowTitle';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import DndContainer from '@containers/common/Table/components/DndContainer';
import { dragSort } from '@containers/common/Table/components/DndContainer/helpers';

import {
  headBannerCells,
  headSliderCells,
} from './helpers';

interface IBannersProps {
  isSlider?: boolean;
}

const Banners = ({ isSlider }: IBannersProps) => {
  const dispatch = useAppDispatch();
  const deleteAction = (id: string) => {
    dispatch(deleteBanner(id)).unwrap().then(() => {
      dispatch(getAllBanners());
    }).catch(() => {});
  };

  const { banners, sliders, isLoading } = useAppSelector(selectBanners);

  const items = isSlider ? [...sliders] : [...banners];

  const reordingData = (result: DropResult) => {
    const sortedData = dragSort(result, items);

    dispatch(reorderBanners(sortedData)).unwrap().then(() => {
      dispatch(isSlider ? setSilders(items) : setBanners(items));
    }).catch(() => dispatch(getAllBanners()));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DndContainer reordingData={reordingData}>
      <StyledTable headCells={isSlider ? headSliderCells : headBannerCells}>
        {items.map(({ title, displayOnSite, id = '' }, index) => (
          <ReusableDragRow id={id} index={index} gridTemplateColumns="auto 173px  140px 150px">
            {({ providedDraggable }) => {
              return (
                < >
                  <TableCell>
                    <RowTitle title={title} path={`/cms/homepage/edit/${id}`} />
                  </TableCell>
                  <TableCell width="173px">{displayOnSite ? 'Yes' : 'No'}</TableCell>
                  <TableCell width="140px">
                    <DndBtn providedDraggable={providedDraggable} />
                  </TableCell>
                  <TableCell width="150px">
                    <DeleteBtn
                      deleteAction={() => deleteAction(id)}
                      questionText="Are you sure you want to delete this banner ?"
                    />
                  </TableCell>
                </>
              );
            }}
          </ReusableDragRow>
        ))}
      </StyledTable>
    </DndContainer>
  );
};

export default memo(Banners);
