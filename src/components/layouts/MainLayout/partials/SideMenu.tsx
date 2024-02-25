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
    UserOutlined,
    ClusterOutlined
} from '@ant-design/icons'
import { FaGalacticRepublic } from "react-icons/fa6";
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
    getItem('Đơn Hàng', pagePaths.order, <ClusterOutlined />),
    getItem('Sản Phẩm', pagePaths.product + "-index", <ShopFilled />, [
        getItem("Tất Cả Sản Phẩm", pagePaths.product, <ShoppingFilled />),
        getItem("Thêm Sản Phẩm", `${pagePaths.product}/${pagePaths.addProduct}`, <AppstoreAddOutlined />),
    ]),    
    getItem('Menu', pagePaths.menu, <WindowsOutlined />),    
    getItem('Tin Tức', pagePaths.news, <MacCommandOutlined />),
    getItem('Youtube - Banner', pagePaths.youtubePost, <YoutubeFilled />),
    getItem('Người Dùng', pagePaths.user, <UserOutlined />),
    getItem('Bài Viết Hỗ Trợ', pagePaths.blog, <FaGalacticRepublic />),
];


export default items;