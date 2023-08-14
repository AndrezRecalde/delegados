import { useDispatch, useSelector } from "react-redux";
import {
    onAddReconteo,
    onClearReconteos,
    onDeleteReconteo,
    onReconteos,
    onSetActivateReconteo,
    onUpdateReconteo,
} from "../../store/app/reconteo/reconteoSlice";
import eleccionApi from "../../api/eleccionApi";
import Swal from "sweetalert2";

export const useReconteoStore = () => {
    const { isLoading, reconteos, activateReconteo, errores } = useSelector(
        (state) => state.reconteo
    );

    const dispatch = useDispatch();

    const startLoadJrvReconteos = async () => {
        try {
            const { data } = await eleccionApi.get("/reconteos/listar");
            const { jrvreconteos } = data;
            dispatch(onReconteos(jrvreconteos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddJrvReconteo = async (jrvreconteo) => {
        try {
            if (jrvreconteo.id) {
                const { data } = await eleccionApi.put(
                    `/reconteo/update/${jrvreconteo.id}`,
                    jrvreconteo
                );
                dispatch(onUpdateReconteo({ ...jrvreconteo }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadJrvReconteos();
                return;
            }
            const { data } = await eleccionApi.post(
                "/reconteo/create",
                jrvreconteo
            );
            dispatch(onAddReconteo({ ...jrvreconteo }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadJrvReconteos();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDeleteJrvReconteo = async (jrvreconteo) => {
        Swal.fire({
            icon: "warning",
            text: `¿Estas seguro de eliminar ${jrvreconteo.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(
                        `/reconteo/delete/${jrvreconteo.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteReconteo(jrvreconteo));
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.msg
                            ? error.response.data.msg
                            : error.response.data.errores
                            ? Object.values(error.response.data.errores)
                            : error.message
                            ? error.message
                            : error,
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const startExportCredenciales = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/reconteos",
                values,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startImportJrvReconteos = async ({ reconteos_import }) => {
        try {
            const { data } = await eleccionApi.post(
                "/reconteos/import",
                {
                    reconteos_import,
                },
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
            startLoadJrvReconteos();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startExcelJrvReconteo = async () => {
        try {
            const response = await eleccionApi.get("/reconteos/export/excel", {
                responseType: "blob",
            });
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
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActivateJrvReconteo = (jrvreconteo) => {
        dispatch(onSetActivateReconteo(jrvreconteo));
    };

    const setClearActivateJrvReconteo = () => {
        dispatch(onSetActivateReconteo(null));
    };

    const startClearJrvReconteos = () => {
        dispatch(onClearReconteos())
    }

    return {
        isLoading,
        reconteos,
        activateReconteo,
        errores,

        startLoadJrvReconteos,
        startAddJrvReconteo,
        startDeleteJrvReconteo,
        startExportCredenciales,
        startImportJrvReconteos,
        startExcelJrvReconteo,
        setActivateJrvReconteo,
        setClearActivateJrvReconteo,
        startClearJrvReconteos
    };
};
