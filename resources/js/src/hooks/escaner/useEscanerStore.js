import { useDispatch, useSelector } from "react-redux";
import {
    onAddEscaneador,
    onClearEscaneador,
    onDeleteEscaneador,
    onEscaneadores,
    onLoading,
    onSetActivateEscaneador,
    onUpdateEscaneador,
} from "../../store/app/escaneador/escaneadorSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useEscanerStore = () => {
    const { isLoading, escaneadores, activateEscaneador, errores } =
        useSelector((state) => state.escaner);

    const dispatch = useDispatch();

    const startLoadEscaneres = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/escaneadores/listar");
            const { escaneadores } = data;
            dispatch(onEscaneadores(escaneadores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddEscaner = async (escaner) => {
        try {
            if (escaner.id) {
                const { data } = await eleccionApi.put(
                    `/escaneador/update/${escaner.id}`,
                    escaner
                );
                dispatch(onUpdateEscaneador({ ...escaner }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadEscaneres();
                return;
            }
            const { data } = await eleccionApi.post(
                "/escaneador/create",
                escaner
            );
            dispatch(onAddEscaneador({ ...escaner }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadEscaneres();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDeleteEscaner = async (escaner) => {
        Swal.fire({
            icon: "warning",
            text: `¿Estas seguro de eliminar ${escaner.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(
                        `/escaneador/delete/${escaner.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteEscaneador(escaner));
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response ? error.response.data.msg : error,
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const startSearchEscaneador = async ({ canton_id }) => {
        try {
            const { data } = await eleccionApi.post("/escaneadores/search", {
                canton_id,
            });
            if (data.status === "error") {
                Swal.fire({
                    icon: "error",
                    text: "¡No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            } else {
                const { escaneadores } = data;
                dispatch(onEscaneadores(escaneadores));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startExportTablePDF = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/table/escaneadores",
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
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startExportCredenciales = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/escaneadores",
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
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startImportEscaneadores = async ({ escaneadores_import }) => {
        try {
            const { data } = await eleccionApi.post(
                "/escaneadores/import",
                {
                    escaneadores_import,
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
            startLoadEscaneres();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearEscaneadores = () => {
        dispatch(onClearEscaneador());
    }

    const setActivateEscaner = (escaner) => {
        dispatch(onSetActivateEscaneador(escaner));
    };

    const setClearActivateEscaner = () => {
        dispatch(onSetActivateEscaneador(null));
    };

    return {
        isLoading,
        escaneadores,
        activateEscaneador,
        errores,

        startLoadEscaneres,
        startAddEscaner,
        startDeleteEscaner,
        startSearchEscaneador,
        startExportTablePDF,
        startExportCredenciales,
        startImportEscaneadores,
        startClearEscaneadores,
        setActivateEscaner,
        setClearActivateEscaner,
    };
};
