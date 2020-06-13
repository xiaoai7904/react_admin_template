/**
 * 请求工具
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Modal, message } from 'antd';
import PageHistory from '@/router/PageHistory';
import mock from '@/module/mock/mock.module';

let isExpired = false;
export default class Http {
  $http: AxiosInstance;
  constructor() {
    this.$http = axios.create({});
    this.init();
  }
  init() {
    this._defaultsConfig();
    this._interceptRequest();
    this._interceptResponse();
  }
  _defaultsConfig() {
    this.$http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    this.$http.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
    this.$http.defaults.responseType = 'json';
    this.$http.defaults.validateStatus = function (status) {
      return true;
    };
  }
  _interceptRequest() {
    this.$http.interceptors.request.use(
      (request) => request,
      (error) => Promise.reject(error)
    );
  }
  _interceptResponse() {
    this.$http.interceptors.response.use(
      (response) => {
        if (response.status === 200 && response.data && response.data.code === 0) {
          return Promise.resolve(response);
        }
        if (response.data && response.data.code === 1401) {
          !isExpired &&
            Modal.warning({
              title: response.data.msg,
              content: '',
              onOk() {
                isExpired = false;
                localStorage.removeItem('isLogin');
                PageHistory.push('/login');
              },
            });
          isExpired = true;
          return Promise.reject(response);
        }
        if (response.data && response.data.code === 1401) {
          return Promise.reject(response);
        }

        if (response.data && response.data.code) {
          message.error(response.data.msg);
          return Promise.reject(response);
        }
        if (response.data && response.data.status) {
          message.error('服务器异常');
        }
        if (!response.data) {
          message.error('连接超时');
        }
        return Promise.reject(response);
      },
      (error) => {
        message.error('数据拉取失败,请检查您的网络');
        return Promise.reject(error);
      }
    );
  }
  get<T = any, R = AxiosResponse<T>>(url: string, params: any): Promise<R> | Promise<any> {
    if((window as any).environment === 'dev') {
      return mock(url)
    }
    return this.$http.get(url, params);
  }
  post<T = any, R = AxiosResponse<T>>(url: string, params: any): Promise<R> | Promise<any> {
    if((window as any).environment === 'dev') {
      return mock(url)
    }
    return this.$http.post(url, params);
  }
}
