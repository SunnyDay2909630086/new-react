import React from 'react';
import { Button, Form, Input, Select, Checkbox, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const BaseForm = (props) => {
  const [form] = Form.useForm();
  const { formList = [], filterSubmit } = props;

  const initFormList = () => {
    console.log(props, '-------------props');
    
    if (!formList || formList.length === 0) {
      return null;
    }

    return formList.map((item) => {
      const {
        label,
        field,
        initialValue,
        width,
        placeholder = '',
        type = 'input',
        list = []
      } = item;

      // 公共的 Form.Item 属性
      const formItemProps = {
        name: field,
        label: label,
        initialValue: initialValue,
        style: { width: width }
      };

      switch (type) {
        case 'datePicker':
          return (
            <Form.Item key={field} {...formItemProps} style={{ width: '350px' }}>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: '260px' }}
              />
            </Form.Item>
          );

        case 'select':
          return (
            <Form.Item key={field} {...formItemProps} style={{ width: '150px' }}>
              <Select
                style={{ width: '80px' }}
                placeholder={placeholder}
              >
                {list.map((listItem) => (
                  <Option key={listItem.id }  // 确保 key 是唯一的
                    value={ listItem.value}>
                    {listItem.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );

        case 'input':
          return (
            <Form.Item key={field} {...formItemProps}>
              <Input
                type="text"
                style={{ width: width }}
                placeholder={placeholder}
              />
            </Form.Item>
          );

        case 'checkbox':
          return (
            <Form.Item 
              key={field}
              {...formItemProps}
              valuePropName="checked"  // 专门用于 Checkbox
            >
              <Checkbox>{label}</Checkbox>
            </Form.Item>
          );

        default:
          return (
            <Form.Item {...formItemProps}>
              <Input
                type="text"
                style={{ width: width }}
                placeholder={placeholder}
              />
            </Form.Item>
          );
      }
    });
  };

  const handleSubmit = (values) => {
    console.log('Received values from form: ', values);
    filterSubmit && filterSubmit(values);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="customized_form_controls"
      layout="inline"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      {initFormList()}
      
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ margin: '0 20px' }}
        >
          查询
        </Button>
        <Button 
          htmlType="button" 
          onClick={handleReset}
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BaseForm;