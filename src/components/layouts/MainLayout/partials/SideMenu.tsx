import { MenuProps } from "antd";
import { pagePaths } from "constants";
import {
    ProjectOutlined,
    WindowsOutlined,
    ShoppingFilled,
    ShopFilled,
    AppstoreAddOutlined,
    MacCommandOutlined,
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
    getItem('Dash Board', pagePaths.home, <ProjectOutlined />),    
    getItem('Menu', pagePaths.menu, <WindowsOutlined />),    
    getItem('Product', pagePaths.product + "-index", <ShopFilled />, [
        getItem("All Product", pagePaths.product, <ShoppingFilled />),
        getItem("Add Product", `${pagePaths.product}/${pagePaths.addProduct}`, <AppstoreAddOutlined />),
    ]),    
    getItem('News', pagePaths.news, <MacCommandOutlined />)
];


export default items;