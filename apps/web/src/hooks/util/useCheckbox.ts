'use client';

import { useState, useMemo } from 'react';

interface ItemProps {
  id: string;
  label: string;
  isRequired: boolean;
}

export const useCheckbox = (itemList: ItemProps[]) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () =>
      itemList.reduce(
        (acc, item) => {
          acc[item.id] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
  );

  const isAllChecked = useMemo(
    () => itemList.every((item) => checkedItems[item.id]),
    [itemList, checkedItems],
  );

  const areAllRequiredChecked = useMemo(
    () =>
      itemList
        .filter((item) => item.isRequired)
        .every((item) => checkedItems[item.id]),
    [itemList, checkedItems],
  );

  const handleCheckAll = (isChecked: boolean) => {
    const newCheckedItems = { ...checkedItems };
    itemList.forEach((item) => {
      newCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleCheck = (id: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
  };

  return {
    checkedItems,
    isAllChecked,
    areAllRequiredChecked,
    handleCheckAll,
    handleCheck,
  };
};
