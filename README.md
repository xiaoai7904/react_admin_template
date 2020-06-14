# react_admin_template

React hook & Typescript 中台系统模版

Vue后台模版请访问另一项目[vue后台模版](https://github.com/xiaoai7904/vue_admin_template)

**如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！** 😊

[在线预览](https://xiaoai7904.github.io/vue_admin_template/)

### 介绍

项目基于`React`,`Ant Design`进行开发,项目根据中台系统页面公用特性封装了很多公用组件,使用公用组件可以通过堆积木的形式快速开发页面,解决基础页面开发效率

```
npm:
npm run start // 启动开发环境
npm run build // 打包生产环境包

yarn:
yarn start // 启动开发环境
yarn build // 打包生产环境包
```

可以通过配置`package.json`中的`scripts`对象进行配置开发环境代理服务器地址

具体配置如下:

```json
"scripts": {
    "serve_custom": "vue-cli-service serve --url=http://192.168.1.188:8080", // 配置代理服务器地址
},
```

```javascript
// config-overrides.js部分代码
const devServerConfig = () => (config) => {
  let options = {
    target: 'http://192.168.1.188:8080',
    changeOrigin: true,
    secure: false,
  };
  if (process.env.NODE_ENV === 'development') {
    let processArgv = process.argv;
    let _url = processArgv[processArgv.length - 1].match(/url=(.*)/);
    if (_url && _url.length >= 2) {
      options.target = `${_url[1]}`;
    }
  }
  return {
    historyApiFallback: true,
    ...config,
    port: 3000,
    proxy: {
      '/sys': options,
    },
  };
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
```

```
npm run serve_custom // 开发环境服务器代理到http://192.168.1.188:8080
&
yarn serve_custom // 开发环境服务器代理到http://192.168.1.188:8080
```

### 项目目录结构

```bash
│
├── README.md                           <=  项目介绍
├── src                                 <=  项目主目录
│   ├── assets                          <=  静态资源
│   ├── components                      <=  公共组件
│   │   ├── 404                         <=  404页面
│   │   ├── pageForm                    <=  搜索表单组件
│   │   ├── pageLoading                 <=  页面loading组件
│   │   ├── pageModal                   <=  弹窗组件
│   │   ├── pageNavTag                  <=  打开页面tag标签组件
│   │   ├── pageScrollbar               <=  页面滚动条组件
│   │   ├── pageTable                   <=  表格组件
│   │   ├── pageTitle                   <=  页面标题组件
│   ├── i18n                            <=  国际化
│   ├── lib                             <=  三方库
│   ├── modules                         <=  系统模块
│   │   ├── createSystemMenu            <=  动态创建路由菜单
│   │   ├── http                        <=  请求模块
│   │   ├── mock                        <=  mock数据模拟
│   │   ├── observer                    <=  事件监听模块
│   │   ├── systemConfig                <=  系统全局配置
│   │   ├── utils                       <=  工具类
│   ├── router                          <=  路由配置
│   ├── store                           <=  数据存储器
│   ├── styles                          <=  系统样式
│   ├── pages                           <=  页面
│   ├── App.tsx                         <=  页面组件文件
│   ├── index.tsx                       <=  系统主入口文件
├── publilc                             <=  项目静态文件目录
├── config-overrides.js                 <=  打包,启动等配置
├── package.js                          <=  项目跟踪依赖关系和元数据配置文件
│
```

### 快速生成页面

通过使用公用 title 组件([PageTitle](src/components/pageTitle/PageTitle.view.tsx)),表单搜索组件([PageForm](src/components/pageForm/PageForm.view.tsx)),数据表格组件([PageTable](src/components/pageTable/PageTable.view.tsx)),进行快速生成基本通用数据展示过滤页面

### 组件使用介绍

##### PageTitle

```javascript
// title props属性列表
interface PageTitleProps extends CommonProps {
  name?: string;
  render?: () => ReactElement;
  info?: string;
  children?: any;
}

const Examples = () => {
  return <PageTitle name="测试页面"></PageTitle>;
};
```

##### PageForm

```javascript
// pageForm props属性列表
export interface PageFormProps {
  options: {
    inline?: boolean,
    labelCol?: layout,
    wrapperCol?: layout,
    size?: string,
    config: PageFormPropsConfigItem[],
    rules?: any,
    isModal?: boolean,
    forceRender?: boolean,
  };
}

export interface PageFormPropsConfigItem {
  id: string;
  type: string;
  name: string;
  options?: {
    value?: string | any[],
    type?: string,
    list?: SelectItem[],
    click?: (config: any) => Promise<any>,
    hidden?: () => boolean,
    min?: number,
    max?: number,
    disabled?: boolean,
    buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined,
    buttonName?: string,
    loading?: boolean,
    htmlType?: 'button' | 'reset' | 'submit' | undefined,
    block?: boolean,
    danger?: boolean,
    showTime?: boolean,
    checkedChildren?: string | JSX.Element,
    unCheckedChildren?: string | JSX.Element,
    customRender?: () => JSX.Element | any,
  };
}

const Examples = () => {
  const defaultPageFormOptions: PageFormProps = {
    options: {
      inline: true,
      config: [
        {
          id: 'test1',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'submit',
          type: 'button',
          name: '',
          options: {
            buttonName: '搜索',
            htmlType: 'submit',
            click: () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log('搜索', pageFormRef.current.getData());
                  resolve();
                }, 3000);
              });
            },
          },
        },
        {
          id: 'reset',
          type: 'button',
          name: '',
          options: {
            buttonName: '重置',
            htmlType: 'reset',
            click: () => {
              return new Promise((resolve, reject) => {
                pageFormRef.current.resetData();

                setTimeout(() => {
                  console.log('重置', pageFormRef.current.getData());
                  resolve();
                }, 3000);
              });
            },
          },
        },
      ],
    },
  };

  const pageFormRef: React.MutableRefObject<{ getData: () => { [key: string]: any }, setData: () => void, restData: () => void }> | any = useRef();
  const [pageFormOptions] = useState(defaultPageFormOptions.options);

  return <PageForm ref={pageFormRef} options={pageFormOptions} />;
};
```

##### PageTable

```javascript
// 表格props 属性列表
export interface TableProps<RecordType> extends Omit<RcTableProps<RecordType>, 'transformColumns' | 'internalHooks' | 'internalRefs' | 'data' | 'columns' | 'scroll'> {
    dropdownPrefixCls?: string;
    dataSource?: RcTableProps<RecordType>['data'];
    columns?: ColumnsType<RecordType>;
    pagination?: false | TablePaginationConfig;
    loading?: boolean | SpinProps;
    size?: SizeType;
    bordered?: boolean;
    locale?: TableLocale;
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, Key[] | null>, sorter: SorterResult<RecordType> | SorterResult<RecordType>[], extra: TableCurrentDataSource<RecordType>) => void;
    rowSelection?: TableRowSelection<RecordType>;
    getPopupContainer?: GetPopupContainer;
    scroll?: RcTableProps<RecordType>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean;
}

export interface PageTableProps<RecordType> extends TableProps<RecordType>{}

const Examples = () => {
    const defaultPageTableOptions: PageTableProps<any> = {
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '自定义',
        dataIndex: 'custom',
        key: 'custom',
        render(value: any, record: any, index: number) {
          return <span>自定义{value}</span>;
        },
      },
    ],
    dataSource: [],
    pagination: {
      pageSize: 100,
      current: 1,
      total: 1000,
    },
  };
    return <PageTable options={pageTableOptions} />
}
```

##### PageModal

```javascript
export interface ModalProps {
    /** 对话框是否可见 */
    visible?: boolean;
    /** 确定按钮 loading */
    confirmLoading?: boolean;
    /** 标题 */
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮 */
    closable?: boolean;
    /** 点击确定回调 */
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    afterClose?: () => void;
    /** 垂直居中 */
    centered?: boolean;
    /** 宽度 */
    width?: string | number;
    /** 底部内容 */
    footer?: React.ReactNode;
    /** 确认按钮文字 */
    okText?: React.ReactNode;
    /** 确认按钮类型 */
    okType?: LegacyButtonType;
    /** 取消按钮文字 */
    cancelText?: React.ReactNode;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** 强制渲染 Modal */
    forceRender?: boolean;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    destroyOnClose?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;
    getContainer?: string | HTMLElement | getContainerFunc | false | null;
    zIndex?: number;
    bodyStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    mask?: boolean;
    keyboard?: boolean;
    wrapProps?: any;
    prefixCls?: string;
    closeIcon?: React.ReactNode;
}

const Examples = () => {
    const defalutPageModalOptions: ModalProps = { title: '用户管理' };
    const [callbackOptions] = useState({
        onCancel() {
            setShowModal(false);
        },
        onOk() {
            setShowModal(false);
        },
    });
    return <PageModal options={pageModalOptions} visible={showModal} callbackOptions={callbackOptions}>
        <!--内容组件-->
      </PageModal>
}
```

### Mock 数据

系统内置`Mock`数据,详情查看源码[mock](src/module/mock/mock.module.ts),通过配置[mock.json](src/module/mock/mock.json.ts)数据,数据 key 对应[SystemConfig.ts](src/module/systemConfig/SystemConfig.ts)

项目默认使用 Mock 数据,如果需要修改可以在项目路径[config.js](public/config.js)`public/config.js`修改`window.environment = 'dev'`变量值,`dev`为使用 mock 数据,对应判断逻辑在[Http](src/module/http/Http.ts),`src/module/http/Http.ts`

```javascript
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
```

### 路由配置

路由数据根据后台返回菜单(目前项目内置接口地址为:`/sys/menu/nav`)列表进行了动态生成,默认配置如下:

```javascript
// src/router/RouterConfig.ts
export const dynamicRouter: { [key: string]: any } = {
  // 首页
  '/home/home': {
    component: React.lazy(() => import('@/pages/home/Home.view')),
  },
};

// 根据后台返回的菜单数据匹配RouterConfig.ts配置路由信息动态生成
create(menuList) {
    // 具体逻辑请查看 src/module/createSystemMenu/CreateSystemMenu.ts
}
```

### 权限管理

###### 1.菜单权限

系统内置菜单权限通过后台返回的菜单数据和路由配置匹配动态生成菜单列表

###### 2.页面操作权限

页面操作权限通过当前用户登录信息接口地址('/sys/menu/nav')返回字段`permissions`进行判断,该字段是一个数组结构,里面存储每个页面操作项权限唯一标示

