import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAvanceParroquia,
    onCloseModalAvanceRecinto,
    onOpenModalAvanceParroquia,
    onOpenModalAvanceRecinto,
} from "../../store/app/dashboard/uiDashboardSlice";

export const useUiDashboard = () => {
    const { isOpenModalAvanceRecinto, isOpenModalAvanceParroquia } =
        useSelector((state) => state.uiDashboard);

    const dispatch = useDispatch();

    const modalActionAvanceParroquia = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalAvanceParroquia());
        } else {
            dispatch(onCloseModalAvanceParroquia());
        }
    };

    const modalActionAvanceRecinto = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalAvanceRecinto());
        } else {
            dispatch(onCloseModalAvanceRecinto());
        }
    };

    return {
        isOpenModalAvanceParroquia,
        isOpenModalAvanceRecinto,

        modalActionAvanceRecinto,
        modalActionAvanceParroquia,
    };
};
