import { Switch, Route, Router, Redirect, HashRouter } from 'react-router-dom';
import pageHistory from './PageHistory';
import React, { ReactElement } from 'react';
import RouterInterceptor from './RouterInterceptor';
import { CommonProps } from '@/types/CommonProps';

export interface RouterAppProps extends CommonProps {
  routerList: any;
  firstPath?: string
}

export const RouterApp = (props: RouterAppProps): ReactElement => {
  
  return (
    // 建议使用history模式 因为部署到githuapages原因暂时使用hash路由模式
    // <Router history={pageHistory}>
      <HashRouter>
      <Switch>
        {props.routerList.map((router: any, index: any) => {
          return <RouterInterceptor key={index} path={router.path} router={router} location={location} firstPath={props.firstPath}/>;
        })}
      </Switch>
      </HashRouter>
    // </Router>
  );
};

export default RouterApp;
