import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalImportReconteo,
    onCloseModalReconteo,
    onOpenModalImportReconteo,
    onOpenModalReconteo,
} from "../../store/app/reconteo/uiReconteoSlice";

export const useUiReconteo = () => {
    const { isOpenModalReconteo, isOpenModalImportReconteo } = useSelector(
        (state) => state.uiReconteo
    );

    const dispatch = useDispatch();

    const modalActionReconteo = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalReconteo());
        } else {
            dispatch(onCloseModalReconteo());
        }
    };

    const modalActionImportReconteo = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalImportReconteo());
        } else {
            dispatch(onCloseModalImportReconteo());
        }
    };

    return {
        isOpenModalReconteo,
        isOpenModalImportReconteo,

        modalActionReconteo,
        modalActionImportReconteo,
    };
};
