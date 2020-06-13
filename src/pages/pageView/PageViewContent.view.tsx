import React, { ReactElement, Suspense } from 'react';
import { observer } from 'mobx-react';
import { useGlobalStore } from '@/store/StoreContext';
import { routerItemInfo } from '@/module/createSystemMenu/CreateSystemMenu';
import { Route, Switch } from 'react-router-dom';
import { CommonProps } from '@/types/CommonProps';
import NotFind from '@/components/404/404';
import PageLoading from '@/components/pageLoading/PageLoading.view';

export const PageViewContent = observer((props: CommonProps) => {
  const { globalStore } = useGlobalStore();

  return (
    <div className="page-view-content">
      <div className="page-view-nav"></div>
      <div className="page-view-containter">
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {globalStore.routerList.map((item: routerItemInfo, index: number): JSX.Element | null | ReactElement => {
            if (item.component) {
              return <Route path={item.path} key={item.path} name={item.name} component={item.component}></Route>;
            }
            return null;
          })}
          <NotFind />
        </Switch>
      </Suspense>
      </div>
    </div>
  );
});

export default PageViewContent;
