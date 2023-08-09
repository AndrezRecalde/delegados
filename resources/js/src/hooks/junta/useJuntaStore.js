import { useDispatch, useSelector } from "react-redux";
import { onLoadJuntas } from "../../store/app/junta/juntaSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useJuntaStore = () => {
    const { juntas } = useSelector((state) => state.junta);
    const dispatch = useDispatch();

    const startLoadJuntas = async (recinto_id) => {
        try {
            const { data } = await eleccionApi.post("/juntas/recinto", {
                recinto_id,
            });
            const { juntas } = data;
            dispatch(onLoadJuntas(juntas));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    return {
        juntas,
        startLoadJuntas,
    };
};
