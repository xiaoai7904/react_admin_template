import { useMount, useUnmount, useLocalStorageState, useRequest } from '@umijs/hooks';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Http from '@/module/http/Http';
import Utils from '@/module/utils/Utils';
import { useGlobalStore } from '@/store/StoreContext';
import CreateSystemMenu from '@/module/createSystemMenu/CreateSystemMenu';
import { LoginProps } from './Login.view';
import '@/lib/bubbly-bg';

export const useLoginHook = (props: LoginProps): LoginHook => {
  const { globalStore } = useGlobalStore();
  const [username, setUsername] = useLocalStorageState('username', localStorage.getItem('username') || '');
  const [isLogin, setIsLogin] = useLocalStorageState('isLogin', false);
  // 请求登录
  const LoginRequest = useRequest((params = {}) => params, {
    manual: true,
    requestMethod: (data: any) => new Http().post(SystemConfig.login, data),
    onSuccess: (result) => {
      setIsLogin(true);
      props.history?.push('/')
      // GetUserInfoRequest.run();
    },
  });
  // 请求用户信息
  const GetUserInfoRequest = useRequest((params = {}) => params, {
    manual: true,
    requestMethod: (data: any) => new Http().post(SystemConfig.getUserInfo, data),
    onSuccess: (result) => {
      let systemMenuIns = new CreateSystemMenu().create(result.data.menuList);
      globalStore.setRouterList(systemMenuIns.getRouterList());
      globalStore.setMenuList(systemMenuIns.getMenuList());
      props.history?.push('/')
    },
  });

  // 获取表单实例
  const [form] = Form.useForm();
  // 登录点击事件
  const onFinish = (values: FormValue) => {
    setUsername(values.remember ? values.username : '');
    LoginRequest.run({ username: values.username, password: Utils.md5(values.password) });
  };

  // 初始化事件绑定
  const initBindEvent = (): void => {
    // 组件初始化
    useMount(() => {
      window.bubbly({
        bubbleFunc: () => `hsla(${200 + Math.random() * 50}, 100%, 60%, .1)`,
      });

      form.setFieldsValue({ username });
    });
    // 组件销毁
    useUnmount(() => {
      document.querySelector('body canvas')?.remove();
    });
  };

  initBindEvent();

  return {
    onFinish,
    username,
    form,
  };
};

export default useLoginHook;

export interface LoginHook {
  onFinish(values: FormValue): void;
  username: string | number | string[] | undefined;
  form: FormInstance;
}

export interface FormValue {
  username?: string;
  password?: string;
  remember?: boolean;
}
