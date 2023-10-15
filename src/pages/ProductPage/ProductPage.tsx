import { Content } from 'antd/es/layout/layout'
import { PlainLayout } from 'components/layouts/ChildLayout/PlainLayout'
import { COPY_RIGHT } from 'constants'
import React from 'react'


const ProductPage: React.FC = () => {
  return (
    <PlainLayout
        headerprops={{title: "Product page"}}
        footerprops={{
            children: COPY_RIGHT,
            className: "text-center",
          }}
          className="bg-inherit h-auto"
    >
        <Content>Some thing content</Content>
    </PlainLayout>
  )
}

export default ProductPage