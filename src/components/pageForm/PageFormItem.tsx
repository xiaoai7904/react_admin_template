import React from 'react';
import { PageFormPropsConfigItem } from './PageForm.types';
import { Input, InputNumber, Select, Button, DatePicker, Switch, Radio } from 'antd';
import { usePageFormItemHook } from './PageForm.hook';
import { FormInstance } from 'antd/lib/form';
import { Form } from 'antd';

export const PageFormItem = (props: { config: PageFormPropsConfigItem; form: FormInstance; options: any }): JSX.Element => {
  const { btnLoading, PageFormItemBtnClickEvent } = usePageFormItemHook(props.form);
  let pageFormItemElement: JSX.Element = <div></div>;
  let config = props.config;
  switch (config.type) {
    case 'input':
      pageFormItemElement = <Input disabled={config.options?.disabled} />;
      break;
    case 'inputNumber':
      pageFormItemElement = <InputNumber min={config.options?.min} max={config.options?.max} disabled={config.options?.disabled} />;
      break;
    case 'textArea':
      pageFormItemElement = <Input.TextArea disabled={config.options?.disabled} />;
      break;
    case 'select':
      pageFormItemElement = <Select options={config.options?.list} disabled={config.options?.disabled}></Select>;
      break;
    case 'button':
      pageFormItemElement = (
        <Button onClick={() => PageFormItemBtnClickEvent(config)} type={config.options?.buttonType || 'primary'} loading={btnLoading} htmlType={config.options?.htmlType || 'button'} block={config.options?.block} danger={config.options?.danger}>
          {config.options?.buttonName}
        </Button>
      );
      break;
    case 'datePicker':
      pageFormItemElement = <DatePicker disabled={config.options?.disabled} />;
      break;
    case 'rangePicker':
      pageFormItemElement = <DatePicker.RangePicker showTime={config.options?.showTime} />;
      break;
    case 'switch':
      pageFormItemElement = <Switch checkedChildren={config.options?.checkedChildren || '开启'} unCheckedChildren={config.options?.unCheckedChildren || '关闭'} disabled={config.options?.disabled} loading={config.options?.loading} />;
      break;
    case 'radio':
      pageFormItemElement = <Radio.Group options={config.options?.list} disabled={config.options?.disabled}></Radio.Group>;
      break;
    case 'customRender':
      pageFormItemElement = config.options?.customRender && config.options?.customRender();
      break;
    default:
      break;
  }

  return (
    <Form.Item className={`${config.type === 'button' ? 'page-form-btn' : ''}`} key={config.id} name={config.id} label={config.name || ''} rules={props.options.rules && props.options.rules[config.id] ? props.options.rules[config.id] : null} valuePropName={config.type === 'switch' ? 'checked' : undefined}>
      {pageFormItemElement}
    </Form.Item>
  );
};
