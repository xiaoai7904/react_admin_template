import React, { forwardRef } from 'react';
import './PageScrollbar.less';
import { usePageScrollbarHook, PageScrollbarProps } from './PageScrollbar.hook';

export const PageScrollbar = forwardRef((props: PageScrollbarProps, ref: any) => {
  const { showScrollBar, hideScrollBar } = usePageScrollbarHook(props, ref);

  return (
    <div className={`page-scrollbar ${props.customClassName}`} onMouseEnter={showScrollBar} onMouseLeave={hideScrollBar}>
      {props.children}
    </div>
  );
});
