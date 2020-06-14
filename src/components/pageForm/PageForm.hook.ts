import { PageFormProps, PageFormPropsConfigItem, PageFormHook } from './PageForm';
import { Form } from 'antd';
import { useState, useImperativeHandle } from 'react';
import { useMount, useUnmount, useLocalStorageState, useRequest } from '@umijs/hooks';
import { FormInstance } from 'antd/lib/form';

export const usePageFormHook = (props: PageFormProps, ref: any): PageFormHook => {
  const { inline, labelCol, wrapperCol, config } = props.options;

  const formItemLayoutValue = inline
    ? null
    : {
        labelCol: Object.assign({}, { span: 4 }, labelCol ? labelCol : {}),
        wrapperCol: Object.assign({ span: 20 }, wrapperCol ? wrapperCol : {}),
      };
  const layout = inline ? 'inline' : 'horizontal';
  const [formItemLayout] = useState(formItemLayoutValue);
  const [initialValues] = useState(_initialValues(config));
  const [defaultShow, setDefaultShow] = useState([]);
  const [defaultHidden, setDefaultHidden] = useState([]);
  const [defaultHiddenIds, setDefaultHiddenIds] = useState([]);
  // form实例
  const [form] = Form.useForm();
  // 更多搜索form实例
  const [formMore] = Form.useForm();
  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: any) => {};
  // 提交表单且数据验证失败后回调事件
  const onFinishFailed = (data: any) => {};
  // 字段更新时触发回调事件
  const onFieldsChange = (changedFields: any, allFields: any) => {};
  // 字段值更新时触发回调事件
  const onValuesChange = (changedValues: any, allValues: any) => {};

  useMount(() => {
    const formData: any = _createFormItemData(config);
    setDefaultShow(formData.defaultShow);
    setDefaultHidden(formData.defaultHidden);
    setDefaultHiddenIds(formData.defaultHidden.map((item: any) => item.id));
  });

  useImperativeHandle(ref, () => ({
    // 获取form表单数据
    getData: () => {
      let formData: { [key: string]: any } = {};
      config.map((item: PageFormPropsConfigItem) => {
        if (item.options && typeof item.options.value !== undefined) {
          formData[item.id] = form.getFieldValue(item.id);
        }
      });
      defaultHiddenIds.map((item: string) => (formData[item] = formMore.getFieldValue(item)));
      return formData;
    },
    setData: (key: string, value: any) => {
      form.setFieldsValue({[key]: value})
    },
    resetData: () => {
      form.resetFields();
      formMore.resetFields();
    },
  }));

  return { form, formMore, formItemLayout, layout, initialValues, onFinish, onFinishFailed, onFieldsChange, onValuesChange, defaultShow, defaultHidden };
};

export const usePageFormItemHook = (form: FormInstance) => {
  const [btnLoading, setBtnLoading] = useState(false);
  // 按钮点击事件
  const PageFormItemBtnClickEvent = (config: PageFormPropsConfigItem) => {
    if (config.options?.click) {
      setBtnLoading(true);
      config.options?.click(config).then(() => setBtnLoading(false));
    }
  };
  return { btnLoading, PageFormItemBtnClickEvent };
};

// 初始化数据
function _initialValues(config: PageFormPropsConfigItem[]) {
  let initValue: { [key: string]: any } = {};

  config.map((item: PageFormPropsConfigItem) => {
    if (item.options && item.options.value) {
      initValue[item.id] = item.options.value;
    }
  });

  return initValue;
}

// 创建item数据
function _createFormItemData(config: PageFormPropsConfigItem[]): { defaultShow: PageFormPropsConfigItem[]; defaultHidden: PageFormPropsConfigItem[] } {
  let count = 0;
  let tempData: PageFormPropsConfigItem[] = [];
  let defaultShow: PageFormPropsConfigItem[] = [];
  let defaultHidden: PageFormPropsConfigItem[] = [];

  let isHiddenFn = (item: PageFormPropsConfigItem) => {
    return item.options && item.options.hidden && typeof item.options.hidden === 'function' && item.options.hidden();
  };
  config.map((item) => {
    if (item.id !== 'submit' && item.id !== 'reset') {
      if (!isHiddenFn(item)) {
        count < 4 ? defaultShow.push(item) : defaultHidden.push(item);
        count++;
      }
    } else if (item.id === 'submit' || item.id === 'reset') {
      tempData.push(item);
    }
  });

  defaultShow = [...defaultShow, ...tempData];

  return {
    defaultShow,
    defaultHidden,
  };
}
export default usePageFormHook;
