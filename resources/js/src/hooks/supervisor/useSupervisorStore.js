import { useDispatch, useSelector } from "react-redux";
import {
    //onAddSupervisor,
    onClearSupervisores,
    onDeleteSupervisor,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateSupervisor,
    onSupervisores,
    //onUpdateSupervisor,
} from "../../store/app/supervisor/supervisorSlice";
import { useErrorException } from "../../hooks";
import eleccionApi from "../../api/eleccionApi";

export const useSupervisorStore = () => {
    const {
        isLoading,
        isExport,
        supervisores,
        activateSupervisor,
        message,
        errores,
    } = useSelector((state) => state.supervisor);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadSupervisores = async ({ canton_id }) => {
        dispatch(onLoading(true));
        try {
            const { data } = await eleccionApi.post("/supervisores/listar", {
                canton_id,
            });
            const { supervisores } = data;
            dispatch(onSupervisores(supervisores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* const startLoadSupervisoresForCanton = async ({ canton_id }) => {
        dispatch(onLoading(true));
        try {
            const { data } = await eleccionApi.post("/supervisores/canton", {
                canton_id,
            });
            const { supervisores } = data;
            dispatch(onSupervisores(supervisores));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }; */

    const startAddSupervisor = async (supervisor) => {
        try {
            if (supervisor.id) {
                const { data } = await eleccionApi.put(
                    `/supervisor/update/${supervisor.id}`,
                    supervisor
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadSupervisores({});
                return;
            }
            const { data } = await eleccionApi.post(
                "/supervisor/create",
                supervisor
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadSupervisores({});
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteSupervisor = async (supervisor) => {
        try {
            const { data } = await eleccionApi.delete(
                `/supervisor/delete/${supervisor.id}`
            );
            dispatch(onDeleteSupervisor(supervisor));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            setClearActivateSupervisor();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startSearchSupervisores = async ({ canton_id, parroquia_id }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await eleccionApi.post("/supervisores/search", {
                canton_id,
                parroquia_id,
            });

            const { supervisores } = data;
            dispatch(onSupervisores(supervisores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportTablePDF = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/table/supervisores",
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

    const startExportCrendenciales = async (values = {}) => {
        try {
            dispatch(onExport(true));
            const response = await eleccionApi.post(
                "/exportar/pdf/cards/supervisores",
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadSupervisores({});
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearSupervisores = () => {
        dispatch(onClearSupervisores());
    };

    const setActivateSupervisor = (supervisor) => {
        dispatch(onSetActivateSupervisor(supervisor));
    };

    const setClearActivateSupervisor = () => {
        dispatch(onSetActivateSupervisor(null));
    };

    return {
        isLoading,
        isExport,
        supervisores,
        activateSupervisor,
        message,
        errores,

        startLoadSupervisores,
        //startLoadSupervisoresForCanton,
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
