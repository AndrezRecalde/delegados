import { useEffect } from "react";
import { useCoordinadorStore } from "../../hooks";
import {
    InfoHeader,
    ModalCoordinador,
    ModalImportCoord,
    TableCoordinadores,
    TitlePage,
} from "../../components";
import Swal from "sweetalert2";

export const CoordinadorPage = () => {
    const {
        coordinadores,
        startLoadCoordinadores,
        startClearCoordinadores,
        message,
        errores,
    } = useCoordinadorStore();

    useEffect(() => {
        startLoadCoordinadores();

        return () => {
            startClearCoordinadores();
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
                Lista Coordinadores
            </TitlePage>
            <InfoHeader
                texto={`Existen ${coordinadores.length} coordinadores a nivel de la provincia de Esmeraldas.`}
            />

            <TableCoordinadores />
            <ModalCoordinador />
            <ModalImportCoord />
        </>
    );
};
