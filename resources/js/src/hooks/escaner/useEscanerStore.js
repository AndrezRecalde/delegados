import { useDispatch, useSelector } from "react-redux";
import {
    //onAddEscaneador,
    onClearEscaneador,
    onDeleteEscaneador,
    onEscaneadores,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateEscaneador,
    //onUpdateEscaneador,
} from "../../store/app/escaneador/escaneadorSlice";
import eleccionApi from "../../api/eleccionApi";
import { useErrorException } from "../../hooks";

export const useEscanerStore = () => {
    const {
        isLoading,
        isExport,
        escaneadores,
        activateEscaneador,
        message,
        errores,
    } = useSelector((state) => state.escaner);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadEscaneres = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/escaneadores/listar");
            const { escaneadores } = data;
            dispatch(onEscaneadores(escaneadores));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddEscaner = async (escaner) => {
        try {
            if (escaner.id) {
                const { data } = await eleccionApi.put(
                    `/escaneador/update/${escaner.id}`,
                    escaner
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadEscaneres();
                return;
            }
            const { data } = await eleccionApi.post(
                "/escaneador/create",
                escaner
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadEscaneres();
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteEscaner = async (escaner) => {
        try {
            const { data } = await eleccionApi.delete(
                `/escaneador/delete/${escaner.id}`
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onDeleteEscaneador());
            setClearActivateEscaner();
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startSearchEscaneador = async ({ canton_id }) => {
        try {
            const { data } = await eleccionApi.post("/escaneadores/search", {
                canton_id,
            });

            const { escaneadores } = data;
            dispatch(onEscaneadores(escaneadores));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportTablePDF = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/table/escaneadores",
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
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportCredenciales = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/escaneadores",
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
            console.log(error);
            ExceptionMessageError(error);
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadEscaneres();
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const exportExcelEscaner = async ({ canton_id }) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/escaneadores/export/excel",
                { canton_id },
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
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearEscaneadores = () => {
        dispatch(onClearEscaneador());
    };

    const setActivateEscaner = (escaner) => {
        dispatch(onSetActivateEscaneador(escaner));
    };

    const setClearActivateEscaner = () => {
        dispatch(onSetActivateEscaneador(null));
    };

    return {
        isLoading,
        isExport,
        escaneadores,
        activateEscaneador,
        message,
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
        exportExcelEscaner,
    };
};
