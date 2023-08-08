import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalImportSuper,
    onCloseModalSupervisor,
    onOpenModalImportSuper,
    onOpenModalSupervisor,
} from "../../store/app/supervisor/uiSupervisorSlice";

export const useUiSupervisor = () => {
    const { isOpenModalSupervisor, isOpenModalImportSuper } = useSelector(
        (state) => state.uiSupervisor
    );

    const dispatch = useDispatch();

    const modalActionSupervisor = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalSupervisor());
        } else {
            dispatch(onCloseModalSupervisor());
        }
    };

    const modalActionImportSuper = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalImportSuper());
        } else {
            dispatch(onCloseModalImportSuper());
        }
    };

    return {
        isOpenModalSupervisor,
        isOpenModalImportSuper,

        modalActionSupervisor,
        modalActionImportSuper
    };
};
