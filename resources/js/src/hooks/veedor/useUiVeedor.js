import { useDispatch, useSelector } from "react-redux";
import {
    onCloseActiveVeedor,
    onCloseModalFileVeedor,
    onCloseModalVeedor,
    onOpenActiveVeedor,
    onOpenModalFileVeedor,
    onOpenModalVeedor,
} from "../../store/app/veedor/uiVeedorSlice";

export const useUiVeedor = () => {
    const { isOpenModalVeedor, isOpenModalFileVeedor, isOpenActiveVeedor } =
        useSelector((state) => state.uiVeedor);

    const dispatch = useDispatch();

    const modalActionVeedor = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalVeedor());
        } else {
            dispatch(onCloseModalVeedor());
        }
    };

    const modalActionFileVeedor = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalFileVeedor());
        } else {
            dispatch(onCloseModalFileVeedor());
        }
    };

    const modalActionActivateVeed = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenActiveVeedor());
        } else {
            dispatch(onCloseActiveVeedor());
        }
    };

    return {
        isOpenModalVeedor,
        isOpenModalFileVeedor,
        isOpenActiveVeedor,

        modalActionVeedor,
        modalActionFileVeedor,
        modalActionActivateVeed
    };
};
