import { useDispatch, useSelector } from "react-redux";
import { onClearRoles, onLoadRoles } from "../../store/app/role/roleSlice";
import eleccionApi from "../../api/eleccionApi";


export const useRoleStore = () => {
    const { roles } = useSelector((state) => state.role);
    const dispatch = useDispatch();

    const startLoadRoles = async () => {
        try {
            const { data } = await eleccionApi.get("/roles/listar");
            const { roles } = data;
            dispatch(onLoadRoles(roles));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearRoles = () => {
        dispatch(onClearRoles());
    }

    return {
        roles,
        startLoadRoles,
        startClearRoles
    };
};
