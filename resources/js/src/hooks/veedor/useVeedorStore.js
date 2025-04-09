import { useDispatch, useSelector } from "react-redux";
import {
    //onAddVeedor,
    onClearVeedores,
    onDeleteVeedor,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateVeedor,
    //onUpdateVeedor,
    onVeedores,
} from "../../store/app/veedor/veedorSlice";
import eleccionApi from "../../api/eleccionApi";
import { useErrorException } from "../../hooks";

export const useVeedorStore = () => {
    const { isLoading, isExport, veedores, activateVeedor, message, errores } =
        useSelector((state) => state.veedor);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadVeedores = async ({
        cantones = [],
        parroquias = [],
        recintos = [],
    }) => {
        dispatch(onLoading(true));
        try {
            const { data } = await eleccionApi.post("/veedores/listar", {
                cantones,
                parroquias,
                recintos,
            });
            const { veedores } = data;
            dispatch(onVeedores(veedores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onLoading(false));
        }
    };

    const startAddVeedor = async (
        veedor,
        cantones = [],
        parroquias = [],
        recintos = []
    ) => {
        try {
            if (veedor.id) {
                const { data } = await eleccionApi.put(
                    `/veedor/update/${veedor.id}`,
                    veedor
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadVeedores({ cantones, parroquias, recintos });
                return;
            }

            const { data } = await eleccionApi.post("/veedor/create", veedor);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadVeedores({cantones, parroquias, recintos});
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteVeedor = async (veedor) => {
        try {
            const { data } = await eleccionApi.delete(
                `/veedor/delete/${veedor.id}`
            );
            dispatch(onDeleteVeedor());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateConfirmVeed = async (cantones = [], veedor) => {
        try {
            const { data } = await eleccionApi.put(
                `/veedor/update/confirmado/${veedor.id}`,
                veedor
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            //dispatch(onDeleteVeedor(veedor));
            startLoadVeedores({ cantones });
            setClearActivateVeedor();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startSearchVeedor = async ({
        canton_id = null,
        parroquia_id = null,
        recinto_id = null,
        supervisor_id = null,
        coordinador_id = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await eleccionApi.post("/veedores/search", {
                canton_id,
                parroquia_id,
                recinto_id,
                supervisor_id,
                coordinador_id,
            });

            const { veedores } = data;
            dispatch(onVeedores(veedores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onLoading(false));
        }
    };

    const startExportTablePDF = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/table/veedores",
                values,
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.open(URL.createObjectURL(pdfBlob));
            window.URL.revokeObjectURL(url);
            dispatch(onExport(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onExport(false));
        }
    };

    const startExportCredenciales = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/veedores",
                values,
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.open(URL.createObjectURL(pdfBlob));
            window.URL.revokeObjectURL(url);
            dispatch(onExport(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onExport(false));
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadVeedores({});
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const exportExcelVeedores = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/veedores/export/excel",
                values,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8",
                })
            );
            window.open(url, "_blank");
            dispatch(onExport(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onExport(false));
        }
    };

    const startClearVeedores = () => {
        dispatch(onClearVeedores());
    };

    const setActivateVeedor = (veedor) => {
        dispatch(onSetActivateVeedor(veedor));
    };

    const setClearActivateVeedor = () => {
        dispatch(onSetActivateVeedor(null));
    };

    return {
        isLoading,
        isExport,
        veedores,
        activateVeedor,
        message,
        errores,

        startLoadVeedores,
        startAddVeedor,
        startDeleteVeedor,
        startUpdateConfirmVeed,
        startSearchVeedor,
        startExportTablePDF,
        startExportCredenciales,
        startImportVeedores,
        exportExcelVeedores,
        setActivateVeedor,
        setClearActivateVeedor,
        startClearVeedores,
    };
};
