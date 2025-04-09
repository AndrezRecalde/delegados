import { useDispatch, useSelector } from "react-redux";
import {
    onClearStates,
    onLoadCantones,
    onLoadParroquias,
    onLoadRecintos,
} from "../../store/app/state/stateSlice";
import eleccionApi from "../../api/eleccionApi";
import Swal from "sweetalert2";

export const useStateStore = () => {
    const { cantones, parroquias, recintos } = useSelector(
        (state) => state.state
    );
    const dispatch = useDispatch();

    const startLoadCantones = async (cantones = null) => {
        try {
            const { data } = await eleccionApi.post("/cantones", { cantones });
            const { cantones: cantonesLoaded } = data;
            dispatch(onLoadCantones(cantonesLoaded));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadParroquias = async (canton_id) => {
        try {
            const { data } = await eleccionApi.post("/parroquias", {
                canton_id,
            });
            const { parroquias } = data;
            dispatch(onLoadParroquias(parroquias));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadRecintos = async (parroquia_id) => {
        try {
            const { data } = await eleccionApi.post("/recintos", {
                parroquia_id,
            });
            const { recintos } = data;
            dispatch(onLoadRecintos(recintos));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadAllRecintos = async (canton_id) => {
        try {
            const { data } = await eleccionApi.post("/todos/recintos", {
                canton_id,
            });
            const { recintos } = data;
            dispatch(onLoadRecintos(recintos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const starClearStates = () => {
        dispatch(onClearStates());
    };

    return {
        cantones,
        parroquias,
        recintos,

        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
        startLoadAllRecintos,
        starClearStates,
    };
};
