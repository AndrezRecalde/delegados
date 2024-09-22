import {
    InfoHeader,
    ModalImportSuperv,
    ModalSupervisor,
    TableSupervisores,
    TitlePage,
} from "../../components";
import { useSupervisorStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const SupervisorPage = () => {
    const {
        supervisores,
        startLoadSupervisores,
        startClearSupervisores,
        message,
        errores,
    } = useSupervisorStore();

    useEffect(() => {
        startLoadSupervisores({});

        return () => {
            startClearSupervisores();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [errores]);

    return (
        <>
            <TitlePage ta="left" order={3}>
                Lista Supervisores
            </TitlePage>
            <InfoHeader
                texto={`Existen ${supervisores.length} supervisores a nivel de la provincia de Esmeraldas.`}
            />

            <TableSupervisores />
            <ModalSupervisor />
            <ModalImportSuperv />
        </>
    );
};
