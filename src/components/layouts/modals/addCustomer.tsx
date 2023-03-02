import { Modal, Form, Button, Input, Select, DatePicker, message } from "antd";
import { data } from "../../../assets/data";
import { useState } from "react";
import { identification } from "../../../assets/data";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { useEffect } from "react";
import {
    getDistrictsAPI,
    getWardsAPI,
    addCustomer,
} from "../../../modules/api/api"
import { gender, customerType } from "../../../assets/data";
import { getNationsAPI, getProvincesAPI } from "../../../modules/api/api";
interface ModalType {
    show: boolean;
    close: () => void;
}

function ModalAddCustomer({ show, close }: ModalType) {
    const nations = useAppSelector((state) => state.area.nations);
    const provinces = useAppSelector((state) => state.area.provinces);
    const districts = useAppSelector((state) => state.area.districts);
    const wards = useAppSelector((state) => state.area.wards);
    // lấy trạng thái id tỉnh/tp và quận huyện
    const [area, setarea] = useState({
        province_id: null,
        district_id: null,
    });
    const { Option } = Select;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getNationsAPI());
        dispatch(getProvincesAPI());
    }, [dispatch]);
    // Lấy quận huyện dựa vào id tỉnh/tp
    useEffect(() => {
        dispatch(getDistrictsAPI(area.province_id));
    }, [area.province_id]);
    // Lấy phường xã dựa vào id quận/huyện
    useEffect(() => {
        dispatch(getWardsAPI(area.district_id));
    }, [area.district_id]);
    // hàm xử lý thêm khách hàng
    const handleAddCustomer = (infoCustomers: any) => {
        infoCustomers.date_of_birth =
        infoCustomers.date_of_birth.format("YYYY-MM-DD");
        const newData = { ...infoCustomers, department_id: 1 };
        dispatch(addCustomer(newData));
        close()
    };
    return (
        //modal thêm khách hàng
        <Modal
            title="Thêm mới khách hàng"
            // centered
            open={show}
            onCancel={close}
            footer={[]}
            width={1000}
            keyboard={true}
        >
            <Form onFinish={handleAddCustomer}>
                <label>Chọn loại khách</label>
                <Form.Item
                    name="customer_type_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn loại khách!",
                        },
                    ]}
                >
                    <Select className="w-full mb-[10px]">
                        {data.map((db) => (
                            <Option value={db.value}>{db.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="flex mb-[20px]">
                    <div className="mr-[5px]">
                        <label htmlFor="">Loại giấy tờ tùy thân</label>
                        <br />
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn giấy tờ tùy thân!",
                                },
                            ]}
                            name="identity_categories_id"
                            className="w-[200px]"
                        >
                            <Select>
                                {identification.map((iden) => (
                                    <Option value={iden.id}>{iden.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-[250px] mr-[5px]">
                        <label>Mã số định danh</label>
                        <Form.Item
                            name="identity"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mã định danh!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="w-[150px] mr-[5px]">
                        <label>Tỉnh/TP</label>
                        <Form.Item name="province_id">
                            <Select
                                className="w-full"
                                onChange={(e) =>
                                    setarea((pre: any) => ({
                                        ...pre,
                                        province_id: e,
                                    }))
                                }
                            >
                                {provinces.map((province: any) => (
                                    <Option value={province.id}>
                                        {province.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-[150px] mr-[5px]">
                        <label>Quận/Huyện</label>
                        <Form.Item name="district_id">
                            <Select
                                className="w-full"
                                onChange={(e) =>
                                    setarea((pre: any) => ({
                                        ...pre,
                                        district_id: e,
                                    }))
                                }
                            >
                                {districts.map((district: any) => (
                                    <Option value={district.id}>
                                        {district.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-[150px] flex-1">
                        <label>Phường/Xã</label>
                        <Form.Item name="ward_id">
                            <Select className="w-full">
                                {wards.map((ward: any) => (
                                    <Option value={ward.id}>{ward.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="flex w-full mb-[20px]">
                    <div className="w-[300px] mr-[5px]">
                        <label htmlFor="">Phân loại khách</label>
                        <Form.Item
                            name="customer_categories_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn phân loại khách!",
                                },
                            ]}
                        >
                            <Select className="w-full">
                                {customerType.map((type: any) => (
                                    <Option value={type.id}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-[300px] mr-[5px]">
                        <label htmlFor="">Tên khách hàng</label>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên khách hàng!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <label htmlFor="">Ngày sinh</label>
                        <br />
                        <Form.Item
                            name="date_of_birth"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ngày sinh!",
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "230%" }}
                                // value={valueUpdate.date_of_birth}
                                format={"YYYY-MM-DD"}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex mb-[10px]">
                    <div className="w-[250px] mr-[5px]">
                        <label htmlFor="">Giới tính</label>
                        <br />
                        <Form.Item
                            name="gender_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn giới tính!",
                                },
                            ]}
                        >
                            <Select className="w-[250px]">
                                {gender.map((gt: any) => (
                                    <Option value={gt.value}>{gt.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-[250px] mr-[5px]">
                        <label htmlFor="">Số điện thoại</label>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="mr-[5px] w-[250px]">
                        <label htmlFor="">Email</label>
                        <br />
                        <Form.Item name="email">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="">Quốc tịch</label>
                        <br />
                        <Form.Item
                            name="nation_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn quốc tịch!",
                                },
                            ]}
                        >
                            <Select className="w-full">
                                {nations.map((nation: any) => (
                                    <Option value={nation.id}>
                                        {nation.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <Button
                    htmlType="submit"
                    style={{
                        backgroundColor: "#1890ff",
                        color: "#fff",
                        width: "100px",
                    }}
                >
                    Thêm mới
                </Button>
            </Form>
        </Modal>
    );
}

export default ModalAddCustomer;
