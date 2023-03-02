import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getListcustomer,
    // getListCustomerStart,
    gettotalPage,
} from "../listcustomerSlice/getListCustomer";
import {
    getNations,
    getProvinces,
    getDistricts,
    getWards,
} from "./getArea/getAreaSlice";
import { notification } from "antd";
import FileSaver from "file-saver";
const token = localStorage.getItem("Token");

//hàm lấy danh sách khách hàng
export const getListCustomers =
    (search: any, page = 1) =>
    async (dispatch: any) => {
        const name = search.name || "";
        const identity = search.identity || "";
        const gender_id = search.gender_id || "";
        const customer_type_id = search.customer_type_id || "";
        try {
            const res = await axios.get(
                `http://apidemo.mhotel9.asia/api/customer?customer_categories_id&customer_type_id=${customer_type_id}&department_id=1&gender=${gender_id}&identity=${identity}&name=${name}&nation&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data) {
                dispatch(getListcustomer(res.data.data));
                dispatch(gettotalPage(res.data.data.last_page));
            }
        } catch (error) {}
    };

// hàm xóa khách hàng
export const delCustomer = createAsyncThunk(
    "delete/deleteCustomer",
    async (id: any, thunkyApI) => {
        try {
            const res = await axios({
                method: "post",
                url: `http://apidemo.mhotel9.asia/api/customer/destroy/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data) {
                thunkyApI.dispatch(getListCustomers({}));
            }
        } catch (error) {}
    }
);

// hàm thêm khách hàng
export const addCustomer = createAsyncThunk(
    "customer/addcustomer",
    async (data: any, thunkyApI) => {
        try {
            const res = await axios.post(
                "http://apidemo.mhotel9.asia/api/customer/store",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            res.data.result
                ? notification.success({
                      message: `Thêm thành công`,
                      description: "Khách hàng đã được thêm!!",
                      placement: "topRight",
                  })
                : notification.error({
                      message: `Thêm thất bại`,
                      description: `${res.data.message}`,
                      placement: "topRight",
                  });
            if (res.data) {
                thunkyApI.dispatch(getListCustomers({}));
            }
        } catch (error) {}
    }
);

//hàm cập nhật khách hàng
export const updateCustomer = createAsyncThunk(
    "update/updateCustomer",
    async (data: any, thunkyAPI) => {
        try {
            const res = await axios({
                method: "post",
                url: `http://apidemo.mhotel9.asia/api/customer/update/${data.id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data,
            });
            res.data.result
                ? notification.success({
                      message: `Cập nhật thành công`,
                      description: "Khách hàng đã được cập nhật!!",
                      placement: "topRight",
                  })
                : notification.error({
                      message: `Cập nhật thất bại`,
                      description: `${res.data.message}`,
                      placement: "topRight",
                  });
            if (res.data) {
                thunkyAPI.dispatch(getListCustomers({}));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

//hàm gọi api lấy quốc gia
export const getNationsAPI = createAsyncThunk(
    "nations/getNations",
    async (_, thunkyApI) => {
        try {
            const res = await axios({
                method: "post",
                url: "http://apidemo.mhotel9.asia/api/administrative_units/nations",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data) {
                thunkyApI.dispatch(getNations(res.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

// hàm gọi api lấy tỉnh/tp
export const getProvincesAPI = createAsyncThunk(
    "provinces/getProvinces",
    async (_, thunkyApI) => {
        try {
            const res = await axios({
                method: "post",
                url: "http://apidemo.mhotel9.asia/api/administrative_units/provinces",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data) {
                thunkyApI.dispatch(getProvinces(res.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

//hàm gọi api lấy quận huyện theo id tỉnh/tp
export const getDistrictsAPI = createAsyncThunk(
    "districts/getDistricts",
    async (provinceId: any, thunkyApI) => {
        const provincesData = JSON.stringify({
            province: provinceId,
        });
        try {
            const res = await axios({
                method: "post",
                url: "http://apidemo.mhotel9.asia/api/administrative_units/districts",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: provincesData,
            });
            if (res.data) {
                thunkyApI.dispatch(getDistricts(res.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
);
//hàm gọi api lấy xã phường tho id quận huyện
export const getWardsAPI = createAsyncThunk(
    "wards/getWards",
    async (districtId: any, thunkyApI) => {
        const districtData = {
            district: districtId,
        };
        try {
            const res = await axios({
                method: "post",
                url: "http://apidemo.mhotel9.asia/api/administrative_units/wards",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: districtData,
            });
            if (res.data) {
                thunkyApI.dispatch(getWards(res.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

//get excel
export const getExcel = createAsyncThunk("excel/getExcel", async () => {
    const res = await axios.get(
        "http://apidemo.mhotel9.asia/api/customer?export=1&department_id=1 ",
        {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/vnd.ms-excel",
            },
        }
    );
    FileSaver.saveAs(res.data, "Customers.xlsx");
});

export const importExcel = createAsyncThunk(
    "excel/importExcel",
    async (formData: any, thunkyApI) => {
        try {
            const res = await axios.post(
                "http://apidemo.mhotel9.asia/api/customer/import-excel",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            //     method: "post",
            //     url: "http://apidemo.mhotel9.asia/api/itemmenus/import-excel",
            //     data: formData,
            //     body : formData,
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //         "Content-Type": "multipart/form-data",
            //     },
            // });
            if (res.data) {
                thunkyApI.dispatch(getListCustomers({}));
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
);
