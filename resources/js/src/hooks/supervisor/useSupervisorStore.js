import { useDispatch, useSelector } from "react-redux";
import {
    onAddSupervisor,
    onClearSupervisores,
    onDeleteSupervisor,
    onLoading,
    onSetActivateSupervisor,
    onSupervisores,
    onUpdateSupervisor,
} from "../../store/app/supervisor/supervisorSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useSupervisorStore = () => {
    const { isLoading, supervisores, activateSupervisor, errores } =
        useSelector((state) => state.supervisor);

    const dispatch = useDispatch();

    const startLoadSupervisores = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/supervisores/listar");
            const { supervisores } = data;
            dispatch(onSupervisores(supervisores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddSupervisor = async (supervisor) => {
        try {
            if (supervisor.id) {
                const { data } = await eleccionApi.put(
                    `/supervisor/update/${supervisor.id}`,
                    supervisor
                );
                dispatch(onUpdateSupervisor({ ...supervisor }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadSupervisores();
                return;
            }
            const { data } = await eleccionApi.post(
                "/supervisor/create",
                supervisor
            );
            dispatch(onAddSupervisor({ ...supervisor }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadSupervisores();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDeleteSupervisor = async (supervisor) => {
        Swal.fire({
            icon: "warning",
            text: `¿Estas seguro de eliminar ${supervisor.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(
                        `/supervisor/delete/${supervisor.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteSupervisor(supervisor));
                    //startLoadSupervisores();
                    setClearActivateSupervisor();
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

    const startSearchSupervisores = async ({ canton_id, parroquia_id }) => {
        try {
            const { data } = await eleccionApi.post("/supervisores/search", {
                canton_id,
                parroquia_id,
            });
            if (data.status === "error") {
                Swal.fire({
                    icon: "error",
                    text: "¡No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            } else {
                const { supervisores } = data;
                dispatch(onSupervisores(supervisores));
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
                "/exportar/pdf/table/supervisores",
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

    const startExportCrendenciales = async (values = {}) => {
        try {
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/supervisores",
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

    const startImportSuperv = async ({ supervisores_import }) => {
        try {
            const { data } = await eleccionApi.post(
                "/supervisores/import",
                {
                    supervisores_import,
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
            startLoadSupervisores();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearSupervisores = () => {
        dispatch(onClearSupervisores());
    }

    const setActivateSupervisor = (supervisor) => {
        dispatch(onSetActivateSupervisor(supervisor));
    };

    const setClearActivateSupervisor = () => {
        dispatch(onSetActivateSupervisor(null));
    };

    return {
        isLoading,
        supervisores,
        activateSupervisor,
        errores,

        startLoadSupervisores,
        startAddSupervisor,
        setActivateSupervisor,
        setClearActivateSupervisor,
        startDeleteSupervisor,
        startSearchSupervisores,
        startExportTablePDF,
        startClearSupervisores,
        startExportCrendenciales,
        startImportSuperv,
    };
};
