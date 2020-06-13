import { FormInstance } from "antd/lib/form";

export interface PageFormProps {
  options: {
    inline?: boolean;
    labelCol?: layout;
    wrapperCol?: layout;
    size?: string;
    config: PageFormPropsConfigItem[];
    rules?: any;
    isModal?: boolean;
  };
}
export interface layout {
  span?: number;
  offset?: number;
}
export interface PageFormPropsConfigItem {
  id: string;
  type: string;
  name: string;
  options?: {
    value?: string | any[];
    type?: string;
    list?: SelectItem[];
    click?: (config:any) => Promise<any>;
    hidden?: () => boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
    buttonName?: string;
    loading?: boolean;
    htmlType?: 'button' | 'reset' | 'submit' | undefined;
    block?: boolean;
    danger?: boolean;
    showTime?: boolean;
    checkedChildren?: string | JSX.Element;
    unCheckedChildren?: string | JSX.Element;
    customRender?: () => JSX.Element | any;
  };
}

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface PageFormHook {
  form: FormInstance;
  formMore: FormInstance;
  formItemLayout: null | { labelCol: layout; wrapperCol: layout };
  layout: 'vertical' | 'horizontal' | 'inline' | undefined;
  initialValues: any;
  onFinish(values: any): void;
  onFinishFailed(data: any): void;
  onFieldsChange(changedFields: any, allFields: any): void;
  onValuesChange(changedFields: any, allFields: any): void;
  defaultShow: PageFormPropsConfigItem[];
  defaultHidden: PageFormPropsConfigItem[];
}
