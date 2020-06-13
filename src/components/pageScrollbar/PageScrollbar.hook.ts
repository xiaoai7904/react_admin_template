import { useMount, useUnmount, useLocalStorageState, useRequest, useThrottleFn } from '@umijs/hooks';
import { addResizeListener, removeResizeListener } from '@/lib/resize-event';
import { ReactElement, useImperativeHandle, useState } from 'react';
import IScroll from 'iscroll';

// let scrollbarIns: any = null;

export const usePageScrollbarHook = (props: PageScrollbarProps, ref: any) => {
  const [scrollbarIns, setScrollbarIns] = useState(null);
  const { run } = useThrottleFn(() => {
    scrollbarIns && (scrollbarIns as any).refresh();
  }, 300);

  const addScrollWrapResize = () => {
    let $el: any = document.querySelector(`.${props.customClassName}`);
    addResizeListener($el.firstChild, run);
  };

  const addScrollEvent = () => {
    let y: any = document.querySelector('.' + props.customClassName + ' .iScrollVerticalScrollbar');
    // let x = document.querySelector('.' + props.customClassName + ' .iScrollHorizontalScrollbar');
    let $$yy: any = document.querySelector('.' + props.customClassName + ' .iScrollVerticalScrollbar .iScrollIndicator');

    scrollbarIns && (scrollbarIns as any).on('scrollStart', function () {
      if ($$yy && $$yy.style.display === 'block') {
        y && (y.style.opacity = 1);
      } else {
        y && (y.style.opacity = 0);
      }
    });
  };

  const showScrollBar = () => {
    let y: any = document.querySelector('.' + props.customClassName + ' .iScrollVerticalScrollbar');
    let x: any = document.querySelector('.' + props.customClassName + ' .iScrollHorizontalScrollbar');

    let $$yy: any = document.querySelector('.' + props.customClassName + ' .iScrollVerticalScrollbar .iScrollIndicator');

    if ($$yy && $$yy.style.display === 'block') {
      y && (y.style.opacity = 1);
    }

    // y && (y.style.opacity = 1);
    x && (x.style.opacity = 1);
  };

  const hideScrollBar = () => {
    let y: any = document.querySelector('.' + props.customClassName + ' .iScrollVerticalScrollbar');
    let x: any = document.querySelector('.' + props.customClassName + ' .iScrollHorizontalScrollbar');

    y && (y.style.opacity = 0);
    x && (x.style.opacity = 0);
  };

  const destroyScrollbar = () => {
    scrollbarIns && (scrollbarIns as any).destroy();
    // (scrollbarIns as any) = null;
    setScrollbarIns(null);
  };

  const update = () => {
    scrollbarIns && (scrollbarIns as any).refresh();
  };

  const initScrollbar = () => {
    let isAndroid = !!navigator.userAgent.toLowerCase().match(/android/i);
    destroyScrollbar();
    let _ins: any = new IScroll(
      `.${props.customClassName}`,
      Object.assign(
        {},
        {
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: 'scale',
          fadeScrollbars: true,
          resizeScrollbars: true,
          scrollX: true,
          scrollY: true,
          disablePointer: true,
          disableTouch: false,
          disableMouse: true,
          click: isAndroid ? true : false, // 处理iscroll 默认禁用了click事件，但是在ios上面是可以使用的
        },
        props.options
      )
    );
    setScrollbarIns(_ins);
    addScrollWrapResize();
    addScrollEvent();
  };

  useMount(() => {
    initScrollbar();
  });

  useUnmount(() => {
    let $el: any = document.querySelector(`.${props.customClassName}`);
    removeResizeListener($el.firstChild);
    // (scrollbarIns as any) = null;
    setScrollbarIns(null);
  });

  useImperativeHandle(ref, () => ({
    update: () => {
      update();
    },
  }));
  return { showScrollBar, hideScrollBar };
};

export interface PageScrollbarProps {
  customClassName: string;
  children: ReactElement;
  options?: any;
  ref?: any;
}
