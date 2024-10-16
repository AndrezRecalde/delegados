import { useDispatch, useSelector } from "react-redux";
import {
    //onAddReconteo,
    onClearReconteos,
    onDeleteReconteo,
    onExport,
    onLoadErrores,
    onLoadMessage,
    onReconteos,
    onSetActivateReconteo,
    //onUpdateReconteo,
} from "../../store/app/reconteo/reconteoSlice";
import eleccionApi from "../../api/eleccionApi";
import { useErrorException } from "../../hooks";

export const useReconteoStore = () => {
    const {
        isLoading,
        isExport,
        reconteos,
        activateReconteo,
        message,
        errores,
    } = useSelector((state) => state.reconteo);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadJrvReconteos = async () => {
        try {
            const { data } = await eleccionApi.get("/reconteos/listar");
            const { jrvreconteos } = data;
            dispatch(onReconteos(jrvreconteos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddJrvReconteo = async (jrvreconteo) => {
        try {
            if (jrvreconteo.id) {
                const { data } = await eleccionApi.put(
                    `/reconteo/update/${jrvreconteo.id}`,
                    jrvreconteo
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadJrvReconteos();
                return;
            }
            const { data } = await eleccionApi.post(
                "/reconteo/create",
                jrvreconteo
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadJrvReconteos();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteJrvReconteo = async (jrvreconteo) => {
        try {
            const { data } = await eleccionApi.delete(
                `/reconteo/delete/${jrvreconteo.id}`
            );
            dispatch(onDeleteReconteo());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportCredenciales = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/reconteos",
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadJrvReconteos();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
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
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateJrvReconteo = (jrvreconteo) => {
        dispatch(onSetActivateReconteo(jrvreconteo));
    };

    const setClearActivateJrvReconteo = () => {
        dispatch(onSetActivateReconteo(null));
    };

    const startClearJrvReconteos = () => {
        dispatch(onClearReconteos());
    };

    return {
        isLoading,
        isExport,
        reconteos,
        activateReconteo,
        message,
        errores,

        startLoadJrvReconteos,
        startAddJrvReconteo,
        startDeleteJrvReconteo,
        startExportCredenciales,
        startImportJrvReconteos,
        startExcelJrvReconteo,
        setActivateJrvReconteo,
        setClearActivateJrvReconteo,
        startClearJrvReconteos,
    };
};
