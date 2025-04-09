import { useDispatch, useSelector } from "react-redux";
import {
    //onAddCoordinador,
    onClearCoordinadores,
    onCoordinadores,
    onDeleteCoordinador,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateCoordinador,
    //onUpdateCoordinador,
} from "../../store/app/coordinador/coordinadorSlice";
import { useErrorException } from "../../hooks";
import eleccionApi from "../../api/eleccionApi";

export const useCoordinadorStore = () => {
    const {
        isLoading,
        isExport,
        coordinadores,
        activateCoordinador,
        message,
        errores,
    } = useSelector((state) => state.coordinador);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadCoordinadores = async () => {
        dispatch(onLoading(true));
        try {
            const { data } = await eleccionApi.get("/coordinadores/listar");
            const { coordinadores } = data;
            dispatch(onCoordinadores(coordinadores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onLoading(false));
        }
    };

    const startLoadCoordsForCanton = async ({ canton_id = null }) => {
        dispatch(onLoading(true));
        try {
            const { data } = await eleccionApi.post("/coordinadores/canton", {
                canton_id,
            });
            const { coordinadores } = data;
            dispatch(onCoordinadores(coordinadores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onLoading(false));
        }
    };

    const startAddCoordinador = async (coordinador) => {
        try {
            if (coordinador.id) {
                const { data } = await eleccionApi.put(
                    `/coordinador/update/${coordinador.id}`,
                    coordinador
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadCoordinadores();
                return;
            }
            const { data } = await eleccionApi.post(
                "/coordinador/create",
                coordinador
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadCoordinadores();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteCoordinador = async (coordinador) => {
        try {
            const { data } = await eleccionApi.delete(
                `/coordinador/delete/${coordinador.id}`
            );
            dispatch(onDeleteCoordinador(coordinador));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            setClearActivateCoordinador();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startSearchCoordinador = async ({
        canton_id,
        parroquia_id,
        recinto_id,
        supervisor_id,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await eleccionApi.post("/coordinadores/search", {
                canton_id,
                parroquia_id,
                recinto_id,
                supervisor_id,
            });
            const { coordinadores } = data;
            dispatch(onCoordinadores(coordinadores));
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
                "/exportar/pdf/table/coordinadores",
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
                "/exportar/pdf/cards/coordinadores",
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadCoordinadores();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadCoordinadorForDNI = async (dni) => {
        try {
            dispatch(onLoading(true));
            const { data } = await eleccionApi.post("/coordinador/dni", {
                dni,
            });
            const { coordinador } = data;
            dispatch(onSetActivateCoordinador(coordinador));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
            dispatch(onLoading(false));
        }
    };

    const exportExcelCoordinadores = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/coordinadores/export/excel",
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
        isExport,
        coordinadores,
        activateCoordinador,
        message,
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
        startLoadCoordinadorForDNI,
        exportExcelCoordinadores,
        startClearCoordinadores,
    };
};
