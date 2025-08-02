'use client';

import Progressbar from '@repo/ui/components/Progressbar';
import { useState } from 'react';

export default function Page() {
  const [progress, setProgress] = useState(32);
  return (
    <main>
      <div className='space-y-4 p-10'>
        <Progressbar progress={progress} />
        <div className='flex gap-2'>
          <button
            onClick={() => setProgress(1)}
            className='rounded bg-gray-200 p-2'
          >
            1%
          </button>
          <button
            onClick={() => setProgress(5)}
            className='rounded bg-gray-200 p-2'
          >
            5%
          </button>
          <button
            onClick={() => setProgress(32)}
            className='rounded bg-gray-200 p-2'
          >
            32%
          </button>
          <button
            onClick={() => setProgress(97)}
            className='rounded bg-gray-200 p-2'
          >
            97%
          </button>
          <button
            onClick={() => setProgress(100)}
            className='rounded bg-gray-200 p-2'
          >
            100%
          </button>
        </div>
        <input
          type='range'
          min='0'
          max='100'
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className='w-full'
        />
      </div>
    </main>
  );
}
