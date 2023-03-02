import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import "../content/content.scss";
import { useAppDispatch } from "../../../redux/hook";
import { delCustomer } from "../../../modules/api/api";
interface modalDelType {
    showmodaldel: boolean;
    customerId: string
    close: () => void;
}
function ModalDelCustomer({ showmodaldel, close , customerId}: modalDelType) {
    const dispatch = useAppDispatch()

    //hàm xóa khách hàng
    const handleOk = () =>{
        dispatch(delCustomer(customerId))
        close()
    }
    return (
        <Modal 
            className=""
            open={showmodaldel}
            onCancel={close}
            footer={
                <>
                    <Button onClick={close}>Hủy</Button>
                    <Button onClick={handleOk} className="border-none text-[white] bg-[#1890ff] btn-edit">
                        Xác nhận
                    </Button>
                </>
            }
            width="300px"
        >
            <>
                <p className="text-[15px]">Bạn có chắc chắn muốn xóa ?</p>
            </>
        </Modal>
    );
}

export default ModalDelCustomer;
