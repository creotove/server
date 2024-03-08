import React from 'react';
import { useEditor } from '@craftjs/core';

export const Editor = () => {
  const { actions, query, enabled } = useEditor();

  return (
    <div>
      {/* Your editor content */}
    </div>
  );
};