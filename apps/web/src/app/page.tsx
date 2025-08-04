'use client';

import { Widget } from '@/components/Widget';
import { WIDGET_CONFIG } from '@/components/Widgets.config';
import dynamic from 'next/dynamic';

const WidgetProvider = dynamic(
  () => import('@/components/providers/widget-provider'),
  { ssr: false },
);

export default function Page() {
  return (
    <main className='min-h-screen bg-gray-100 p-8'>
      <WidgetProvider isEditMode={false}>
        {(widgets) =>
          widgets.map((widget) => {
            const ComponentToRender = WIDGET_CONFIG[widget.id]?.Component;
            if (!ComponentToRender) return null;

            return (
              <Widget key={widget.id} widget={widget}>
                <ComponentToRender />
              </Widget>
            );
          })
        }
      </WidgetProvider>
    </main>
  );
}
