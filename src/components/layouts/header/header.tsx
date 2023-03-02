import { Link } from "react-router-dom";
import { Layout } from "antd";
import "./header.scss";
function Header() {
    const { Header } = Layout;
    const userinfo:any= localStorage.getItem("user-info");
    const user = JSON.parse(userinfo)
    const handleLogout = () => {
        localStorage.removeItem("Token");
        // localStorage.removeItem("Name");
        localStorage.removeItem("user-info")
    };
    return (
        <Header className="header bg-white">
            <div className="flex justify-end">
                <div className="account flex gap-2">
                    <p className="block text-[15px]">{user ? user.user.name : ''}</p>
                    <Link
                        to="/"
                        onClick={handleLogout}
                        className="block text-[15px]"
                    >
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </Header>
    );
}

export default Header;
