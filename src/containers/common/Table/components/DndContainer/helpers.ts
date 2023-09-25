import { getReorderedArray } from '@utils/helpers';
import { DropResult } from '@hello-pangea/dnd';

interface IDraggableItem {
  [key: string]: any;
}

export const nestedDragSort = <T extends IDraggableItem>(
  result: DropResult, data: T[], listName: keyof T) => {
  const items = data.map((item) => ({ ...item, listName: [...item[listName]] })) as any[];
  const { destination, draggableId } = result;

  const draggableItem = items.find((item) => item[listName].find((i: IDraggableItem) => i.id === draggableId));
  const idx = items.findIndex((item) => item[listName].find((i: IDraggableItem) => i.id === draggableId));

  if (destination && draggableItem) {
    const draggableData = [...draggableItem[listName]];
    const [removed] = draggableData.splice(result.source.index, 1);

    draggableData.splice(destination.index, 0, removed);
    items[idx][listName] = draggableData;

    return { sortedData: getReorderedArray(draggableData), items };
  }

  return { sortedData: { orders: [] }, items };
};

export const dragSort = (result: DropResult, data: any) => {
  const items = [...data];
  const { destination } = result;

  if (destination) {
    const [removed] = items.splice(result.source.index, 1);

    items.splice(destination.index, 0, removed);

    return { sortedData: getReorderedArray(items), items };
  }

  return { sortedData: { orders: [] }, items };
};
