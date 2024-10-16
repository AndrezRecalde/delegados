import { useDispatch, useSelector } from "react-redux";
import {
    //onAddJrvmovil,
    onClearJrvmovil,
    onDeleteJrvmovil,
    onExport,
    onJrvmoviles,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateJrvmovil,
    //onUpdateJrvmovil,
} from "../../store/app/jrvmovil/jrvmovilSlice";

import eleccionApi from "../../api/eleccionApi";
import { useErrorException } from "../../hooks";

export const useJrvmovilStore = () => {
    const { isLoading, isExport, jrvmoviles, activateJrvmovil, errores } = useSelector(
        (state) => state.jrvmovil
    );

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadJrvmoviles = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await eleccionApi.get("/jrvmoviles/listar");
            const { jrvmoviles } = data;
            dispatch(onJrvmoviles(jrvmoviles));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddJrvmovil = async (jrvmovil) => {
        try {
            if (jrvmovil.id) {
                const { data } = await eleccionApi.put(
                    `/jrvmovil/update/${jrvmovil.id}`,
                    jrvmovil
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadJrvmoviles();
                return;
            }
            const { data } = await eleccionApi.post(
                "/jrvmovil/create",
                jrvmovil
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadJrvmoviles();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteJrvmovil = async (jrvmovil) => {
        try {
            const { data } = await eleccionApi.delete(
                `/jrvmovil/delete/${jrvmovil.id}`
            );
            dispatch(onDeleteJrvmovil());
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
                "/exportar/pdf/cards/jrvmoviles",
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadJrvmoviles();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
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
            //console.log(error);
            ExceptionMessageError(error);
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
    };

    return {
        isLoading,
        isExport,
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
        startClearJrvmoviles,
    };
};
