import React, { ReactElement, forwardRef } from 'react';
import { Form, Popover, Button } from 'antd';
import { PageFormProps, PageFormPropsConfigItem } from './PageForm';
import usePageFormHook from './PageForm.hook';
import { PageFormItem } from './PageFormItem';
import { PageScrollbar } from '../pageScrollbar/PageScrollbar.view';
import './PageForm.less';
import { FormInstance } from 'antd/lib/form';
import { DownOutlined } from '@ant-design/icons';

export const PageForm = forwardRef((props: PageFormProps, ref: any): ReactElement => <div className={`page-form ${props.options.inline ? 'page-form-inline' : 'page-form-horizontal'}`}>{CreatePageForm(props, ref)}</div>);

const CreatePageForm = (props: PageFormProps, ref: any): ReactElement | any => {
  const { form, formMore, formItemLayout, layout, initialValues, onFinish, onFinishFailed, onFieldsChange, onValuesChange, defaultShow, defaultHidden } = usePageFormHook(props, ref);

  if (props.options.isModal) {
    return (
      <Form {...formItemLayout} form={form} layout={layout} initialValues={initialValues} size="middle" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={onFieldsChange} onValuesChange={onValuesChange}>
        {CreatePageFormItem(props, defaultShow, defaultHidden, form)}
      </Form>
    );
  }
  return (
    <div className="page-form-show--wrap">
      <PageScrollbar customClassName="page-form--scrollbar" options={{ scrollY: false }}>
        <div className="page-form-show--container">
          <Form {...formItemLayout} form={form} layout={layout} initialValues={initialValues} size="middle" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={onFieldsChange} onValuesChange={onValuesChange}>
            {CreatePageFormItem(props, defaultShow, defaultHidden, form, formMore)}
          </Form>
        </div>
      </PageScrollbar>
    </div>
  );
};
const CreatePageFormItem = (props: PageFormProps, defaultShow: PageFormPropsConfigItem[], defaultHidden: PageFormPropsConfigItem[], form: FormInstance, formMore?: FormInstance): ReactElement | any => {
  if (props.options.isModal) {
    return props.options.config.map((item: PageFormPropsConfigItem) => {
      if (item.options && item.options.hidden && item.options.hidden()) {
        return null;
      }

      return FormItem(props, item, form);
    });
  }
  const hiddenContent = (
    <div className="page-form-hidden-content">
      <Form form={formMore} layout="inline" size="middle">{defaultHidden.map((item: PageFormPropsConfigItem) => FormItem(props, item, form))}</Form>
    </div>
  );
  const hiddenFormWrap = (
    <Popover content={hiddenContent} placement="bottom" title="更多筛选" trigger="click">
      <Button type="dashed" icon={<DownOutlined />}>
        更多筛选
      </Button>
    </Popover>
  );
  return (
    <div>
      {defaultShow.map((item: PageFormPropsConfigItem) => FormItem(props, item, form))}
      {defaultHidden.length > 0 && hiddenFormWrap}
    </div>
  );
};

const FormItem = (props: PageFormProps, item: PageFormPropsConfigItem, form: FormInstance): ReactElement => {
  return <PageFormItem key={item.id} config={item} form={form} options={props.options} />;
};

export default PageForm;
