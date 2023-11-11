import { MenuProps } from "antd";
import { pagePaths } from "constants";
import {
    ProjectOutlined,
    WindowsOutlined,
    ShoppingFilled,
    ShopFilled,
    AppstoreAddOutlined,
    MacCommandOutlined,
    YoutubeFilled,
    UserOutlined
} from '@ant-design/icons'

export type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?:React.ReactNode,
    children?: MenuItem[],
    theme?: 'light' | 'dark',
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        theme
    }
}

const items: MenuItem[] = [
    getItem('Trang Chủ', pagePaths.home, <ProjectOutlined />),    
    getItem('Menu', pagePaths.menu, <WindowsOutlined />),    
    getItem('Sản Phẩm', pagePaths.product + "-index", <ShopFilled />, [
        getItem("Tất Cả Sản Phẩm", pagePaths.product, <ShoppingFilled />),
        getItem("Thêm Sản Phẩm", `${pagePaths.product}/${pagePaths.addProduct}`, <AppstoreAddOutlined />),
    ]),    
    getItem('Tin Tức', pagePaths.news, <MacCommandOutlined />),
    getItem('Youtube - Banner', pagePaths.youtubePost, <YoutubeFilled />),
    getItem('Người Dùng', pagePaths.user, <UserOutlined />),
];


export default items;