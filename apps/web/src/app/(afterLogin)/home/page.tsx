'use client';

import WidgetProvider from '@/components/providers/widget-provider';

import { Widget } from '@/components/Widget';

import { WIDGET_CONFIG } from '@/config/widget';

export default function Page() {
  return (
    <main>
      <WidgetProvider isEditMode={false}>
        {(widgets) =>
          widgets.map((widget) => {
            const widgetIdString = widget.id as keyof typeof WIDGET_CONFIG;
            const ComponentToRender = WIDGET_CONFIG[widgetIdString]?.Component;

            if (!ComponentToRender) {
              console.warn(`위젯 컴포넌트를 찾을 수 없습니다: ${widget.id}`);
              return null;
            }

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
