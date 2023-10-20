import { Card, Divider, Space, Typography } from 'antd'
import React from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const {Title} = Typography;

type LeftContentProps = {
    markdownContent?: string;
}

const LeftContent = ({markdownContent}: LeftContentProps) => {
  return (
    <Card className='rounded-none'>
        <Space direction='vertical'>
            <Title level={3}>Chi Tiết Sản Phẩm</Title>
            <Divider className='my-2' />
            <Markdown rehypePlugins={[rehypeRaw]}>{markdownContent}</Markdown>
        </Space>
    </Card>
  )
}

export default LeftContent