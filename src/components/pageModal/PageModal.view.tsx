import React, { ReactElement } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

export const PageModal = (props: { options: ModalProps; visible: boolean; callbackOptions: { [key: string]: (...arg: any[]) => void }; children: ReactElement }) => {
  const { options, children, callbackOptions, visible } = props;
  return (
    <div className="page-modal">
      <Modal
        afterClose={options.afterClose}
        bodyStyle={options.bodyStyle}
        cancelText={options.cancelText}
        centered={options.centered}
        closable={options.closable}
        closeIcon={options.closeIcon}
        confirmLoading={options.confirmLoading}
        destroyOnClose={options.destroyOnClose}
        footer={options.footer}
        forceRender={options.forceRender}
        keyboard={false}
        mask={true}
        maskClosable={false}
        maskStyle={options.maskStyle}
        okText={options.okText}
        okType={options.okType}
        okButtonProps={options.okButtonProps}
        cancelButtonProps={options.cancelButtonProps}
        style={options.style}
        title={options.title}
        visible={visible}
        width={options.width || 600}
        wrapClassName={options.wrapClassName}
        onCancel={callbackOptions.onCancel}
        onOk={callbackOptions.onOk}
      >
        {children}
      </Modal>
    </div>
  );
};
