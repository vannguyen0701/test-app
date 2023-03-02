import {
    Modal,
    Button,
    Form,
    Select,
    Input,
    DatePicker,
    FormInstance,
    message,
} from "antd";
import {
    data,
    gender,
    identification,
    customerType,
} from "../../../assets/data";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import moment from "moment";
import {
    getDistrictsAPI,
    getWardsAPI,
    updateCustomer,
} from "../../../modules/api/api";
import dayjs from "dayjs";
import { useRef, useEffect, useState } from "react";
interface modalState {
    showmodalUpdate: boolean;
    close: () => void;
    valueUpdate: any;
}
function ModalUpdate({ showmodalUpdate, close, valueUpdate }: modalState) {
    // tạo formRef lấy value các input
    const formRef = useRef<FormInstance>(null);
    const dispatch = useAppDispatch();
    const nations = useAppSelector((state) => state.area.nations);
    const provinces = useAppSelector((state) => state.area.provinces);
    const districts = useAppSelector((state) => state.area.districts);
    const wards = useAppSelector((state) => state.area.wards);
    const [area, setarea] = useState({
        province_id: null,
        district_id: null,
    });
    const { Option } = Select;
    // gán giá trị các input
    useEffect(() => {
        formRef.current?.setFieldsValue({
            id: valueUpdate.id,
            department_id: valueUpdate.department_id,
            customer_type_id: valueUpdate.customer_type_id,
            identity_categories_id: valueUpdate.identity_categories_id,
            identity: valueUpdate.identity,
            province_id: valueUpdate.province,
            district_id: valueUpdate.district,
            ward_id: valueUpdate.ward,
            customer_categories_id: valueUpdate.customer_categories_id,
            name: valueUpdate.name,
            date_of_birth: dayjs(`${valueUpdate.date_of_birth}`, "YYYY-MM-DD"),
            gender_id: valueUpdate.gender_id,
            phone: valueUpdate.phone,
            email: valueUpdate.email,
            nation_id: valueUpdate.nation_id,
        });
    }, []);
    useEffect(() => {
        dispatch(getDistrictsAPI(area.province_id));
    }, [area.province_id]);
    useEffect(() => {
        dispatch(getWardsAPI(area.district_id));
    }, [area.district_id]);

    //hàm xử lý cập nhật khách hàng
    const handleFinish = (datas: any) => {
        datas.date_of_birth = datas.date_of_birth.format("YYYY-MM-DD");
        dispatch(updateCustomer(datas));
        close();
    };

    return (
        <Modal
            title="Cập nhật khách hàng"
            // centered
            open={showmodalUpdate}
            onCancel={close}
            footer={[]}
            width={1000}
            keyboard={true}
        >
            <Form onFinish={handleFinish} ref={formRef}>
                <Form.Item name="id" className="hidden">
                    <Input />
                </Form.Item>
                <Form.Item name="department_id" className="hidden">
                    <Input />
                </Form.Item>
                <label>Chọn loại khách</label>
                <Form.Item name="customer_type_id">
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
                        <Form.Item name="customer_categories_id">
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
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <label htmlFor="">Ngày sinh</label>
                        <br />
                        <Form.Item name="date_of_birth">
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
                        <Form.Item name="gender_id">
                            <Select className="w-[250px]">
                                {gender.map((gt: any) => (
                                    <Option value={gt.value}>{gt.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-[250px] mr-[5px]">
                        <label htmlFor="">Số điện thoại</label>
                        <Form.Item name="phone">
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
                        <Form.Item name="nation_id">
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
                    Cập nhật
                </Button>
            </Form>
        </Modal>
    );
}

export default ModalUpdate;
