import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PageView from '@/pages/pageView/PageView.view';
import Login from '@/pages/login/Login.view';
import { CommonProps, Location } from '@/types/CommonProps';

export interface RouteInterceptorProps extends CommonProps {
  path: string;
  router: any;
  location: Location;
  firstPath?: string
}

export const RouteInterceptor = (props: RouteInterceptorProps) => {
  const isLogin = localStorage.getItem('isLogin');
  const { path, location } = props;
  
  if (isLogin === 'true') {
    if(location.pathname === '/' && props.firstPath) {
      return <Redirect to={{ pathname: props.firstPath, state: { from: location } }} />;
    }
    return <Route path={path} render={(props: any) => <PageView {...props} />} />;
  }

  if (location.pathname !== '/login') {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }

  return <Route exact path="/login" render={(props: any) => <Login {...props} />} />;
};

export default RouteInterceptor;
