import { Form, Input } from 'antd'
import { TextEditor } from 'components/shared';
import React from 'react'
import * as yup from 'yup';

type Props = {}

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16}
}

const ProductForm = (props: Props) => {
  return (
    <Form
    {...layout}
    >

        {/* product name */}
        <Form.Item label="Tên Sản phẩm">
            <Input placeholder='Nhập Tên sản phẩm'/>
        </Form.Item>
        <Form.Item>
            <TextEditor />
        </Form.Item>
    </Form>
  )
}

export default ProductForm