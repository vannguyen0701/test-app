import { Layout, Menu } from "antd";
import { dataMenu } from "../../../assets/data/";
import "./sider.scss";
import logo from "../../../assets/logo/googleplay.png";
import {
    AppstoreOutlined,
    MailOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    // type?: "group"
    ): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        // type,
    } as MenuItem;
}

const items: MenuProps["items"] = [
    getItem("Trang chủ", "sub1", <MailOutlined />, [
        getItem("Option 1", "1"),
        getItem("Option 2", "2"),
        getItem("Option 3", "3"),
        getItem("Option 4", "4"),
    ]),
    getItem("Quản lý nhân sự", "sub2", <AppstoreOutlined />, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
    ]),
];

function Sidebar() {
    const { Sider } = Layout;
    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
    };
    return (
        <Sider className="bg-white sider">
            {/* <div className="logo bg-white mt-[8px]">
                <img src={logo} alt="" />
            </div>
            <Menu>
                {dataMenu.map((menu:any)=>
                    <SubMenu key={menu.key} icon={menu.icon}>{menu.title}</SubMenu>
                )}
            </Menu> */}
            <div className="logo bg-white mt-[8px] p-[25px]">
                <img src={logo} alt="" />
            </div>
            {/* <Menu
                onClick={onClick}
                // defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["sub1"]}
                mode="inline"    
                items={items}
            /> */}
            <Menu mode="inline" onClick={onClick}>
                {dataMenu.map(menu=>
                    <SubMenu icon={menu.icon} title={menu.title}>
                        {menu.menu_item.map(menuItem=>
                            <Menu.Item key={menuItem.key_menu}>{menuItem.label}</Menu.Item>
                            )}
                    </SubMenu>
                    )}
            </Menu>
        </Sider>
    );
}

export default Sidebar;
