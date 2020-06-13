import { useState } from 'react';
import { useGlobalStore } from '@/store/StoreContext';
import { useMount } from '@umijs/hooks';
import { PageTitleProps } from './PageTitle.view';

export const usePageTitleHook = (props: PageTitleProps) => {
  const [defaultTitle, setDefaultTitle] = useState('');
  const {globalStore} = useGlobalStore();

  const _getCurrentRouterName = () => {
    let _routers = globalStore.menuList;
    let eachFn = (data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length) {
          eachFn(data[i].children);
        } else {
          if (props.location?.pathname === data[i].path) {
            setDefaultTitle(data[i].name)
            break;
          }
        }
      }
    };
    eachFn(_routers);
  };

  useMount(() => {
    _getCurrentRouterName()
  })

  return {
    defaultTitle
  }
};
