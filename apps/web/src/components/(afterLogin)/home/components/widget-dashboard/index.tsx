'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import WidgetProvider from '@/components/providers/widget-provider';

import { Widget } from '@/components/Widget';
import { WIDGET_CONFIG } from '@/config/widget';

import { Button } from '@repo/ui/components';

export default function HomeDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEditMode = searchParams.get('edit') === 'true';

  const toggleEditMode = () => {
    if (isEditMode) {
      router.push('/home');
    } else {
      router.push('/home?edit=true');
    }
  };

  return (
    <>
      <div className='mb-4 flex justify-end'>
        <Button
          onClick={toggleEditMode}
          variant={isEditMode ? 'primary' : 'secondary'}
        >
          {isEditMode ? '저장' : '위젯 편집'}
        </Button>
      </div>

      <WidgetProvider isEditMode={isEditMode}>
        {(widgets) =>
          widgets.map((widget) => {
            const ComponentToRender =
              WIDGET_CONFIG[widget.id as keyof typeof WIDGET_CONFIG]?.Component;
            if (!ComponentToRender) return null;

            return (
              <Widget key={widget.id} widget={widget}>
                <ComponentToRender />
              </Widget>
            );
          })
        }
      </WidgetProvider>
    </>
  );
}
