import React from 'react';
import { useGlobalStore } from '@/store/StoreContext';
import { observer } from 'mobx-react';
import RouterApp from '@/router/Router';
import '@/style/system.less';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

const App = observer(() => {
  const { globalStore } = useGlobalStore();

  const firstPath = globalStore.menuList.length ? globalStore.menuList[0].children[0].path : '';

  return (
    <ConfigProvider locale={zhCN}>
      <RouterApp routerList={globalStore.routerList} firstPath={firstPath} />
    </ConfigProvider>
  );
});

export default App;
