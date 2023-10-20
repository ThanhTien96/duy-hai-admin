import { Typography,  } from 'antd'
import { MediaBox } from 'components/shared';
import { TImageMediaBox } from 'components/shared/MediaBox';
import React from 'react'
import { IProductMediaType } from 'types/Product';
const {Title, Text} = Typography;
type DetailItemProps = {
    media?: IProductMediaType[];
}

const DetailItem = ({media}: DetailItemProps) => {
  return (
    <div>
        <div>
            <MediaBox direction='horizontal' media={media ? media?.map<TImageMediaBox>((ele: IProductMediaType) => ({
                id: ele.id,
                src: ele.hinhAnh
            })): [] } />
        </div>
        <Title level={3}></Title>
    </div>
  )
}

export default DetailItem