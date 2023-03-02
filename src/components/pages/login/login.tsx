import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import axios from "axios";
import "./login.scss";
import { setLogin } from "./loginSlice";
function Login() {
    const naviage = useNavigate();
    const dispatch = useAppDispatch();
    const handleSubmit = async (data: any) => {
        try {
            const res = await axios.post(
                "http://apidemo.mhotel9.asia/api/login",
                data
            );
            if (res.data.result) {
                localStorage.setItem("Token", res.data.data.access_token);
                localStorage.setItem(
                    "user-info",
                    JSON.stringify(res.data.data)
                );
                naviage("/layout");
            } else {
                alert("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="login w-[450px] p-[25px] rounded">
            <Form onFinish={handleSubmit}>
                <h3 className="block text-[18px] mb-[15px] font-medium">Đăng nhập</h3>
                <Form.Item name="email">
                    <Input placeholder="Email" autoComplete="off" />
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password placeholder="Mật khẩu" autoComplete="off" />
                </Form.Item>
                <Button
                    htmlType="submit"
                    className="block mx-auto text-white bg-[#1677ff] btn"
                >
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
}

export default Login;
