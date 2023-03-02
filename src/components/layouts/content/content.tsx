import "./content.scss";
import {
    Layout,
    Input,
    Button,
    Select,
    Pagination,
    Table,
    Form,
    Upload,
    Popconfirm,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
    EditOutlined,
    DeleteOutlined,
    DownloadOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { setPage } from "../../../modules/listcustomerSlice/getListCustomer";
import { useState, useEffect } from "react";
import {
    delCustomer,
    getExcel,
    getListCustomers,
    importExcel,
} from "../../../modules/api/api";
import { dataType } from "../../../assets/data/interface";
import { data, gender } from "../../../assets/data";
import ModalAddCustomer from "../modals/addCustomer";
import ModalDelCustomer from "../modals/delCustomer";
import ModalUpdate from "../modals/updateCustomer";
import type { UploadProps } from "antd";
function Contents() {
    const dispatch = useAppDispatch();
    const customers = useAppSelector((state) => state.customers.customers);
    const page = useAppSelector((state) => state.customers.page);
    const totalPages = useAppSelector((state) => state.customers.totalpage);
    const { Option } = Select;
    const { Content } = Layout;
    const [showmodaldel, setshowmodaldel] = useState(false);
    const [customerId, setcustomerId] = useState("");
    const [show, setShow] = useState(false);
    const [showmodalUpdate, setshowmodalUpdate] = useState(false);
    const [valueUpdate, setvalueUpdate] = useState({});
    const [searchItem, setsearchItem] = useState("");

    useEffect(() => {
        dispatch(getListCustomers(searchItem, page));
    }, [searchItem, page]);

    const handleExport = async () => {
        dispatch(getExcel());
    };

    const handleFileSelect = (e: any) => {
        const file = e.fileList[0].originFileObj;
        const formData = new FormData();
        formData.append("file", file);
        dispatch(importExcel(formData));
    };

    //hàm thay đổi page
    const handlePageChange = (newPage: any) => {
        dispatch(setPage(newPage));
    };

    const handleSearch = (searchItem: any) => {
        setsearchItem(searchItem);
    };

    //hàm lấy id khách hàng để xóa
    const handlegetId = (id: any) => {
        // setshowmodaldel(true);
        setcustomerId(id);
    };

    const handleConfirm = () =>{
        dispatch(delCustomer(customerId))
    }

    //hàm lấy thông tin 1 khách hàng
    const handleEdit = (value: any) => {
        setshowmodalUpdate(true);
        setvalueUpdate(value);
    };

    //tạo dữ liệu table
    const columns: ColumnsType<dataType> = [
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giới tính",
            dataIndex: "gender_name",
            key: "gender_name",
        },
        {
            title: "Số định danh",
            dataIndex: "identity",
            key: "identity",
        },
        {
            title: "Quốc tịch",
            dataIndex: "nation",
            key: "gender_name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Loại khách hàng",
            dataIndex: "customertype",
            key: "customertype",
        },
        {
            title: "Chức năng",
            dataIndex: "action",
            render: (text, record) => (
                <div className="flex justify-center">
                    <Button
                        className="flex justify-center items-center mr-[4px] border-none bg-[#1890ff] text-[white] btn-edit"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa khách hàng !"
                        description="Bạn có chắc chắn muốn xóa ?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={handleConfirm}
                    >
                        <Button
                            className="flex justify-center items-center mr-[4px] bg-[#ff4d4f] text-[white] border-none btn-delete"
                            icon={<DeleteOutlined />}
                            onClick={() => handlegetId(record.id)}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    return (
        <Content className="mt-[10px] mx-[10px] p-[24px] min-h-[1000px] bg-white">
            <h1 className="block mb-[20px] text-[20px] font-bold">
                QUẢN LÍ KHÁCH HÀNG
            </h1>

            <Form className="flex justify-between" onFinish={handleSearch}>
                <Form.Item name="name">
                    <Input
                        placeholder="Tên khách hàng"
                        // onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <Form.Item name="identity">
                    <Input
                        placeholder="Số định danh"
                        // onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <label className="flex mt-[5px]">Giới tính:</label>
                <Form.Item name="gender_id" className="w-[200px]">
                    <Select>
                        {gender.map((gt) => (
                            <Option value={gt.value}>{gt.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <label className="flex mt-[5px]">Loại khách:</label>
                <Form.Item name="customer_type_id" className="w-[200px]">
                    <Select>
                        {data.map((lk) => (
                            <Option value={lk.value}>{lk.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Button
                    htmlType="submit"
                    className="bg-[#1890ff] text-[white] border-none btn-add"
                >
                    Tìm kiếm
                </Button>
            </Form>
            <div className="flex justify-between items-center">
                <Button
                    onClick={() => setShow(true)}
                    className="my-[15px] bg-[#1890ff] text-[white] border-none btn-add"
                >
                    Thêm mới
                </Button>
                <div className="flex">
                    <Upload
                        name="file"
                        onChange={(e) => handleFileSelect(e)}
                        accept=".xlsx, .csv"
                    >
                        <Button
                            className="mx-[15px] bg-[#0d8447] text-[white] border-none btn-excel flex items-center"
                            icon={<UploadOutlined />}
                        >
                            Nhập Excel
                        </Button>
                    </Upload>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleExport}
                        className="bg-[#0d8447] text-[white] border-none btn-excel flex items-center"
                    >
                        Xuất Excel
                    </Button>
                </div>
            </div>
            {/* <ExportExcelButton/> */}
            {/* <Button className="border-none ml-[10px] bg-[#0d8447db] text-[white] btn-excel">
                Xuất Excel
            </Button> */}
            <Table
                rowKey={(obj) => obj.id}
                columns={columns}
                dataSource={customers}
                bordered
                pagination={false}
                rootClassName= 'text-center'
            />
            <Pagination
                current={page}
                total={totalPages * 10}
                onChange={handlePageChange}
                className="flex justify-end mt-[10px]"
            />

            {/* Hien thi modal them khach hang*/}
            {show && (
                <ModalAddCustomer show={show} close={() => setShow(false)} />
            )}
            {/* Hien thi modal xoa khach hang*/}
            {showmodaldel && (
                <ModalDelCustomer
                    showmodaldel={showmodaldel}
                    close={() => setshowmodaldel(false)}
                    customerId={customerId}
                />
            )}
            {/* Hien thi modal cap nhat khach hang*/}
            {showmodalUpdate && (
                <ModalUpdate
                    showmodalUpdate={showmodalUpdate}
                    close={() => setshowmodalUpdate(false)}
                    valueUpdate={valueUpdate}
                />
            )}
        </Content>
    );
}

export default Contents;
