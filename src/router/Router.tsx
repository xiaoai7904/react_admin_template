import { Switch, Route, Router, Redirect } from 'react-router-dom';
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
    <Router history={pageHistory}>
      <Switch>
        {props.routerList.map((router: any, index: any) => {
          return <RouterInterceptor key={index} path={router.path} router={router} location={location} firstPath={props.firstPath}/>;
        })}
      </Switch>
    </Router>
  );
};

export default RouterApp;
