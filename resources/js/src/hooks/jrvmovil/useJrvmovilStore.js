import { useDispatch, useSelector } from "react-redux";
import {
    onAddJrvmovil,
    onClearJrvmovil,
    onDeleteJrvmovil,
    onJrvmoviles,
    onSetActivateJrvmovil,
    onUpdateJrvmovil,
} from "../../store/app/jrvmovil/jrvmovilSlice";

import eleccionApi from "../../api/eleccionApi";
import Swal from "sweetalert2";

export const useJrvmovilStore = () => {
    const { isLoading, jrvmoviles, activateJrvmovil, errores } = useSelector(
        (state) => state.jrvmovil
    );

    const dispatch = useDispatch();

    const startLoadJrvmoviles = async () => {
        try {
            const { data } = await eleccionApi.get("/jrvmoviles/listar");
            const { jrvmoviles } = data;
            dispatch(onJrvmoviles(jrvmoviles));
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

    const startAddJrvmovil = async (jrvmovil) => {
        try {
            if (jrvmovil.id) {
                const { data } = await eleccionApi.put(
                    `/jrvmovil/update/${jrvmovil.id}`,
                    jrvmovil
                );
                dispatch(onUpdateJrvmovil({ ...jrvmovil }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadJrvmoviles();
                return;
            }
            const { data } = await eleccionApi.post(
                "/jrvmovil/create",
                jrvmovil
            );
            dispatch(onAddJrvmovil({ ...jrvmovil }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadJrvmoviles();
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

    const startDeleteJrvmovil = async (jrvmovil) => {
        Swal.fire({
            icon: "warning",
            text: `¿Estas seguro de eliminar ${jrvmovil.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(`/jrvmovil/delete/${jrvmovil.id}`);
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteJrvmovil(jrvmovil));
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

    const startExportCredenciales = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/jrvmoviles",
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

    const startImportJrvmoviles = async ({ jrvmoviles_import }) => {
        try {
            const { data } = await eleccionApi.post(
                "/jrvmoviles/import",
                {
                    jrvmoviles_import,
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
            startLoadJrvmoviles();
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

    const exportExcelJrvmoviles = async () => {
        try {
            const response = await eleccionApi.get("/jrvmoviles/export/excel", {
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

    const setActivateJrvmovil = (jrvmovil) => {
        dispatch(onSetActivateJrvmovil(jrvmovil));
    };

    const setClearActivateJrvmovil = () => {
        dispatch(onSetActivateJrvmovil(null));
    };

    const startClearJrvmoviles = () => {
        dispatch(onClearJrvmovil());
    }

    return {
        isLoading,
        jrvmoviles,
        activateJrvmovil,
        errores,

        startLoadJrvmoviles,
        startAddJrvmovil,
        startDeleteJrvmovil,
        startExportCredenciales,
        startImportJrvmoviles,
        exportExcelJrvmoviles,
        setActivateJrvmovil,
        setClearActivateJrvmovil,
        startClearJrvmoviles
    };
};
