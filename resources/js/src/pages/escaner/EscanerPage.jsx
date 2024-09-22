import { useEffect } from "react";
import {
    InfoHeader,
    ModalEscaneador,
    ModalImportEscaneador,
    TableEscaneadores,
    TitlePage,
} from "../../components";
import { useEscanerStore } from "../../hooks";
import Swal from "sweetalert2";

export const EscanerPage = () => {
    const {
        escaneadores,
        startLoadEscaneres,
        startClearEscaneadores,
        message,
        errores,
    } = useEscanerStore();

    useEffect(() => {
        startLoadEscaneres();

        return () => {
            startClearEscaneadores();
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
                Escaneadores
            </TitlePage>
            <InfoHeader
                texto={`Existen ${escaneadores.length} escaneadores registrados a nivel de la provincia de Esmeraldas.`}
            />

            <TableEscaneadores />

            <ModalEscaneador />
            <ModalImportEscaneador />
        </>
    );
};
