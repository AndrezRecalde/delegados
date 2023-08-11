import { useDispatch, useSelector } from "react-redux";
import {
    onClearTotales,
    onLoadAvanceCantones,
    onLoadTotalConfirmados,
    onLoadTotalCoordinadores,
    onLoadTotalEscaneadores,
    onLoadTotalJuntas,
    onLoadTotalSupervisores,
    onLoadTotalUsuarios,
    onLoadTotalVeedores,
    onLoading,
} from "../../store/app/dashboard/dashboardSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useDashboardStore = () => {
    const {
        isLoading,
        totalSupervisores,
        totalCoordinadores,
        totalVeedores,
        totalConfirmados,
        totalUsuarios,
        totalEscaneadores,
        totalJuntas,
        avanceCantones,
    } = useSelector((state) => state.dashboard);

    const dispatch = useDispatch();

    const startLoadTotalSupervisores = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/supervisores");
            const { totalSupervisores } = data;
            dispatch(onLoadTotalSupervisores(totalSupervisores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalCoordinadores = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/coordinadores");
            const { totalCoordinadores } = data;
            dispatch(onLoadTotalCoordinadores(totalCoordinadores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalVeedores = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/veedores");
            const { totalVeedores } = data;
            dispatch(onLoadTotalVeedores(totalVeedores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalVeedoresConfirmed = async () => {
        try {
            const { data } = await eleccionApi.get(
                "/totales/veedores/confirmados"
            );
            const { totalConfirmados } = data;
            dispatch(onLoadTotalConfirmados(totalConfirmados));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalUsuarios = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/usuarios");
            const { totalUsuarios } = data;
            dispatch(onLoadTotalUsuarios(totalUsuarios));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalEscaneadores = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/escaneadores");
            const { totalEscaneadores } = data;
            dispatch(onLoadTotalEscaneadores(totalEscaneadores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalJuntas = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/juntas");
            const { totalJuntas } = data;
            dispatch(onLoadTotalJuntas(totalJuntas));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAvanceCantones = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/avance/cantones");
            const { avanceCantones } = data;
            dispatch(onLoadAvanceCantones(avanceCantones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearTotales = () => {
        dispatch(onClearTotales());
    };

    return {
        isLoading,
        totalSupervisores,
        totalCoordinadores,
        totalVeedores,
        totalConfirmados,
        totalUsuarios,
        totalEscaneadores,
        totalJuntas,
        avanceCantones,

        startLoadTotalSupervisores,
        startLoadTotalCoordinadores,
        startLoadTotalVeedores,
        startLoadTotalVeedoresConfirmed,
        startLoadTotalUsuarios,
        startLoadTotalEscaneadores,
        startLoadTotalJuntas,
        startClearTotales,
        startAvanceCantones,
    };
};
