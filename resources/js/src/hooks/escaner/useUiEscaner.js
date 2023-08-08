import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalEscaneador,
    onCloseModalImportEscaner,
    onOpenModalEscaneador,
    onOpenModalImportEscaner,
} from "../../store/app/escaneador/uiEscaneadorSlice";

export const useUiEscaner = () => {
    const { isOpenModalEscaneador, isOpenModalImportEscaner } = useSelector(
        (state) => state.uiEscaner
    );

    const dispatch = useDispatch();

    const modalActionEscaner = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalEscaneador());
        } else {
            dispatch(onCloseModalEscaneador());
        }
    };

    const modalActionImportEscaner = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalImportEscaner());
        } else {
            dispatch(onCloseModalImportEscaner());
        }
    };

    return {
        isOpenModalEscaneador,
        isOpenModalImportEscaner,

        modalActionEscaner,
        modalActionImportEscaner,
    };
};
