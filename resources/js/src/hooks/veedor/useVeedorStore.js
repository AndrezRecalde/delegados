import { useDispatch, useSelector } from "react-redux";
import {
    onAddVeedor,
    onClearVeedores,
    onDeleteVeedor,
    onLoading,
    onSetActivateVeedor,
    onUpdateVeedor,
    onVeedores,
} from "../../store/app/veedor/veedorSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useVeedorStore = () => {
    const { isLoading, veedores, activateVeedor, errores } = useSelector(
        (state) => state.veedor
    );

    const dispatch = useDispatch();

    const startLoadVeedores = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/veedores/listar");
            const { veedores } = data;
            dispatch(onVeedores(veedores));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddVeedor = async (veedor) => {
        try {
            if (veedor.id) {
                const { data } = await eleccionApi.put(
                    `/veedor/update/${veedor.id}`,
                    veedor
                );
                dispatch(onUpdateVeedor({ ...veedor }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadVeedores();
                return;
            }

            const { data } = await eleccionApi.post("/veedor/create", veedor);
            dispatch(onAddVeedor({ ...veedor }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadVeedores();
        } catch (error) {
            console.log(error)
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

    const startDeleteVeedor = async (veedor) => {
        Swal.fire({
            icon: "warning",
            text: `¿Estas seguro de eliminar ${veedor.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(`/veedor/delete/${veedor.id}`);
                    Swal.fire("¡Eliminado!", "", "success");
                    startLoadVeedores();
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

    const startUpdateConfirmVeed = async (veedor) => {
        try {
            const { data } = await eleccionApi.put(
                `/veedor/update/confirmado/${veedor.id}`,
                veedor
            );
            dispatch(onUpdateVeedor({ ...veedor }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            dispatch(onDeleteVeedor(veedor));
            setClearActivateVeedor();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startSearchVeedor = async ({
        canton_id,
        recinto_id,
        supervisor_id,
        coordinador_id,
    }) => {
        try {
            const { data } = await eleccionApi.post("/veedores/search", {
                canton_id,
                recinto_id,
                supervisor_id,
                coordinador_id,
            });
            if (data.status === "error") {
                Swal.fire({
                    icon: "error",
                    text: "¡No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            } else {
                const { veedores } = data;
                dispatch(onVeedores(veedores));
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
                "/exportar/pdf/table/veedores",
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
                "/exportar/pdf/cards/veedores",
                values,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startImportVeedores = async ({ veedores_import }) => {
        try {
            const { data } = await eleccionApi.post(
                "/veedores/import",
                {
                    veedores_import,
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
            startLoadVeedores();
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearVeedores = () => {
        dispatch(onClearVeedores());
    }

    const setActivateVeedor = (veedor) => {
        dispatch(onSetActivateVeedor(veedor));
    };

    const setClearActivateVeedor = () => {
        dispatch(onSetActivateVeedor(null));
    };

    return {
        isLoading,
        veedores,
        activateVeedor,
        errores,

        startLoadVeedores,
        startAddVeedor,
        startDeleteVeedor,
        startUpdateConfirmVeed,
        startSearchVeedor,
        startExportTablePDF,
        startExportCredenciales,
        startImportVeedores,
        setActivateVeedor,
        setClearActivateVeedor,
        startClearVeedores
    };
};
