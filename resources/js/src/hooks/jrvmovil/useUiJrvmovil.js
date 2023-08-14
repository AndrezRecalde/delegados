import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalImportJrvmovil,
    onCloseModalJrvmovil,
    onOpenModalImportJrvmovil,
    onOpenModalJrvmovil,
} from "../../store/app/jrvmovil/uiJrvmovilSlice";

export const useUiJrvmovil = () => {
    const { isOpenModalJrvmovil, isOpenModalImportJrvmovil } = useSelector(
        (state) => state.uiJrvmovil
    );

    const dispatch = useDispatch();

    const modalActionJrvmovil = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalJrvmovil());
        } else {
            dispatch(onCloseModalJrvmovil());
        }
    };

    const modalActionImportJrvmovil = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalImportJrvmovil());
        } else {
            dispatch(onCloseModalImportJrvmovil());
        }
    };

    return {
        isOpenModalJrvmovil,
        isOpenModalImportJrvmovil,

        modalActionJrvmovil,
        modalActionImportJrvmovil,
    };
};
