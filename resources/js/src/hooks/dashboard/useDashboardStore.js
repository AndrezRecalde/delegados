import { useDispatch, useSelector } from "react-redux";
import {
    onClearTotales,
    onLoadAvanceCantones,
    onLoadAvanceParroquias,
    onLoadAvanceRecintos,
    onLoadTotalConfirmados,
    onLoadTotalCoordinadores,
    onLoadTotalEscaneadores,
    onLoadTotalJrvMoviles,
    onLoadTotalJrvReconteo,
    onLoadTotalJuntas,
    onLoadTotalSupervisores,
    onLoadTotalUsuarios,
    onLoadTotalVeedores,
    onLoading,
    onLoadingTableParr,
    onLoadingTableRec,
    onSetActivateCanton,
    onSetActivateParroquia,
} from "../../store/app/dashboard/dashboardSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useDashboardStore = () => {
    const {
        isLoading,
        isLoadingTableParr,
        isLoadingTableRec,
        totalSupervisores,
        totalCoordinadores,
        totalVeedores,
        totalConfirmados,
        totalJrvMoviles,
        totalJrvReconteo,
        totalUsuarios,
        totalEscaneadores,
        totalJuntas,
        avanceCantones,
        avanceParroquias,
        avanceRecintos,
        activateCanton,
        activateParroquia,
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadTotalJrvMoviles = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/jrv/moviles");
            const { totalJrvMoviles } = data;
            dispatch(onLoadTotalJrvMoviles(totalJrvMoviles));
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

    const startLoadTotalJrvReconteos = async () => {
        try {
            const { data } = await eleccionApi.get("/totales/jrv/reconteos");
            const { totalJrvReconteos } = data;
            dispatch(onLoadTotalJrvReconteo(totalJrvReconteos));
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
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

    const startAvanceParroquias = async () => {
        dispatch(onLoadingTableParr());
        try {
            const { data } = await eleccionApi.get("/avance/parroquias");
            const { avanceParroquias } = data;
            dispatch(onLoadAvanceParroquias(avanceParroquias));
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

    const startAvanceParroquia = async ({ id }) => {
        dispatch(onLoadingTableParr());
        try {
            const { data } = await eleccionApi.post("/avance/parroquia", {
                canton_id: id,
            });
            const { avanceParroquias } = data;
            dispatch(onLoadAvanceParroquias(avanceParroquias));
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

    const startAvanceRecintos = async ({ parroquia_id }) => {
        dispatch(onLoadingTableRec());
        try {
            const { data } = await eleccionApi.post("/avance/recintos", {
                parroquia_id,
            });
            const { avanceRecintos } = data;
            dispatch(onLoadAvanceRecintos(avanceRecintos));
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

    const startLoadVeedoresForCanton = async (cantones) => {
        try {
            const { data } = await eleccionApi.post(
                "/totales/veedores/cantones",
                { cantones }
            );
            const { totalVeedores } = data;
            dispatch(onLoadTotalVeedores(totalVeedores));
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

    const startLoadJuntasForCanton = async (cantones) => {
        try {
            const { data } = await eleccionApi.post(
                "/totales/juntas/cantones",
                { cantones }
            );
            const { totalJuntas } = data;
            dispatch(onLoadTotalJuntas(totalJuntas));
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

    const setActivateCanton = (canton) => {
        dispatch(onSetActivateCanton(canton));
    };

    const setActivateParroquia = (parroquia) => {
        dispatch(onSetActivateParroquia(parroquia));
    };

    const setClearActivateCanton = () => {
        dispatch(onSetActivateCanton(null));
    };

    const setClearActivateParroquia = () => {
        dispatch(onSetActivateParroquia(null));
    };

    const setClearAvanceParroquias = () => {
        dispatch(onLoadAvanceParroquias([]));
    };

    const setClearAvanceRecintos = () => {
        dispatch(onLoadAvanceRecintos([]));
    };

    const startClearTotales = () => {
        dispatch(onClearTotales());
    };

    return {
        isLoading,
        isLoadingTableParr,
        isLoadingTableRec,
        totalSupervisores,
        totalCoordinadores,
        totalVeedores,
        totalConfirmados,
        totalJrvMoviles,
        totalJrvReconteo,
        totalUsuarios,
        totalEscaneadores,
        totalJuntas,
        avanceCantones,
        avanceParroquias,
        avanceRecintos,
        activateCanton,
        activateParroquia,

        startLoadTotalSupervisores,
        startLoadTotalCoordinadores,
        startLoadTotalVeedores,
        startLoadTotalVeedoresConfirmed,
        startLoadTotalJrvMoviles,
        startLoadTotalJrvReconteos,
        startLoadTotalUsuarios,
        startLoadTotalEscaneadores,
        startLoadTotalJuntas,
        startClearTotales,
        startAvanceCantones,
        startAvanceParroquias,
        startAvanceParroquia,
        startAvanceRecintos,
        setActivateCanton,
        setActivateParroquia,
        setClearActivateCanton,
        setClearActivateParroquia,
        setClearAvanceParroquias,
        setClearAvanceRecintos,
        startLoadVeedoresForCanton,
        startLoadJuntasForCanton,
    };
};
