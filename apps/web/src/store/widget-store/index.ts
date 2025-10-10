import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { arrayMove } from '@dnd-kit/sortable';
import { Widget } from '@/types/Widget';
import { defaultWidgetIds, WIDGET_CONFIG } from '@/config/widget';

interface State {
  widgets: Widget[];
  reorderWidgets: (oldIndex: number, newIndex: number) => void;
}

const getDefaultWidgets = (): Widget[] => {
  return defaultWidgetIds
    .map((id) => WIDGET_CONFIG[id as keyof typeof WIDGET_CONFIG])
    .filter(Boolean)
    .map((config) => ({
      id: config.id,
      ...config.defaultLayout,
    }));
};

export const useWidgetStore = create<State>()(
  persist(
    (set, get) => ({
      widgets: getDefaultWidgets(),

      reorderWidgets: (oldIndex, newIndex) => {
        const currentWidgets = get().widgets;
        if (oldIndex !== -1 && newIndex !== -1) {
          set({ widgets: arrayMove(currentWidgets, oldIndex, newIndex) });
        }
      },
    }),
    {
      name: 'widget-layout',
    },
  ),
);
