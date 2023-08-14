import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAvanceRecinto,
    onOpenModalAvanceRecinto,
} from "../../store/app/dashboard/uiDashboardSlice";

export const useUiDashboard = () => {
    const { isOpenModalAvanceRecinto } = useSelector(
        (state) => state.uiDashboard
    );

    const dispatch = useDispatch();

    const modalActionAvanceRecinto = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalAvanceRecinto());
        } else {
            dispatch(onCloseModalAvanceRecinto());
        }
    };

    return {
        isOpenModalAvanceRecinto,
        modalActionAvanceRecinto,
    };
};
