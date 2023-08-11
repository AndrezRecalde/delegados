import { useDispatch, useSelector } from "react-redux";
import {
    onAddCoordinador,
    onClearCoordinadores,
    onCoordinadores,
    onDeleteCoordinador,
    onLoading,
    onSetActivateCoordinador,
    onUpdateCoordinador,
} from "../../store/app/coordinador/coordinadorSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useCoordinadorStore = () => {
    const { isLoading, coordinadores, activateCoordinador, errores } =
        useSelector((state) => state.coordinador);

    const dispatch = useDispatch();

    const startLoadCoordinadores = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/coordinadores/listar");
            const { coordinadores } = data;
            dispatch(onCoordinadores(coordinadores));
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

    const startLoadCoordsForCanton = async (canton_id) => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.post("/coordinadores/canton", {
                canton_id,
            });
            const { coordinadores } = data;
            dispatch(onCoordinadores(coordinadores));
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

    const startAddCoordinador = async (coordinador) => {
        try {
            if (coordinador.id) {
                const { data } = await eleccionApi.put(
                    `/coordinador/update/${coordinador.id}`,
                    coordinador
                );
                dispatch(onUpdateCoordinador({ ...coordinador }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadCoordinadores();
                return;
            }
            const { data } = await eleccionApi.post(
                "/coordinador/create",
                coordinador
            );
            dispatch(onAddCoordinador({ ...coordinador }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadCoordinadores();
        } catch (error) {
            console.log(error);
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

    const startDeleteCoordinador = async (coordinador) => {
        Swal.fire({
            icon: "warning",
            text: `¿Estas seguro de eliminar ${coordinador.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(
                        `/coordinador/delete/${coordinador.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteCoordinador(coordinador));
                    setClearActivateCoordinador();
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
            }
        });
    };

    const startSearchCoordinador = async ({
        canton_id,
        parroquia_id,
        recinto_id,
        supervisor_id,
    }) => {
        try {
            const { data } = await eleccionApi.post("/coordinadores/search", {
                canton_id,
                parroquia_id,
                recinto_id,
                supervisor_id,
            });
            if (data.status === "error") {
                Swal.fire({
                    icon: "error",
                    text: "¡No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            } else {
                const { coordinadores } = data;
                dispatch(onCoordinadores(coordinadores));
            }
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

    const startExportTablePDF = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/table/coordinadores",
                values,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
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

    const startExportCredenciales = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/coordinadores",
                values,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
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

    const startImportCoord = async ({ coordinadores_import }) => {
        try {
            const { data } = await eleccionApi.post(
                "/coordinadores/import",
                { coordinadores_import },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Swal.fire({
                icon: "info",
                text: data.msg,
                confirmButtonColor: "#c81d11",
            });
            startLoadCoordinadores();
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

    const exportExcelCoordinadores = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/coordinadores/export/excel", values,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8",
                })
            );
            window.open(url, "_blank");
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

    const startClearCoordinadores = () => {
        dispatch(onClearCoordinadores());
    };

    const setActivateCoordinador = (coordinador) => {
        dispatch(onSetActivateCoordinador(coordinador));
    };

    const setClearActivateCoordinador = () => {
        dispatch(onSetActivateCoordinador(null));
    };

    return {
        isLoading,
        coordinadores,
        activateCoordinador,
        errores,

        startLoadCoordinadores,
        startLoadCoordsForCanton,
        startAddCoordinador,
        startDeleteCoordinador,
        setActivateCoordinador,
        setClearActivateCoordinador,
        startSearchCoordinador,
        startExportTablePDF,
        startExportCredenciales,
        startImportCoord,
        exportExcelCoordinadores,
        startClearCoordinadores,
    };
};
