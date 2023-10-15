import { Badge, Card } from 'antd'
import React from 'react'

export type TMainCategoriesItemProps = {
    children?: React.ReactNode;
    title?: React.ReactNode;
    color?: string;
    ribbon?: string;
}

const MainCategoriesItem = (props: TMainCategoriesItemProps) => {
  return (
    <Badge.Ribbon color={props.color} text={props.ribbon ?? "Hip"}>
      <Card title={props.title} size="small">
        {props.children}
      </Card>
    </Badge.Ribbon>
  )
}

export default MainCategoriesItem