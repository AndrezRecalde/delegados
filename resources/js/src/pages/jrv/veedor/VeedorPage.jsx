import { useEffect } from "react";
import {
    InfoHeader,
    ModalActivateVeed,
    ModalImportVeed,
    ModalVeedor,
    TableVeedores,
    TitlePage,
} from "../../../components";
import { useVeedorStore } from "../../../hooks";
import Swal from "sweetalert2";

export const VeedorPage = () => {
    const {
        veedores,
        startLoadVeedores,
        startClearVeedores,
        message,
        errores,
    } = useVeedorStore();

    useEffect(() => {
        startLoadVeedores();

        return () => {
            startClearVeedores();
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
                Delegados de la Junta
            </TitlePage>
            <InfoHeader
                texto={`Existen ${veedores.length} delegados registrados a nivel de la provincia de Esmeraldas.`}
            />

            <TableVeedores />
            <ModalVeedor />
            <ModalActivateVeed />
            <ModalImportVeed />
        </>
    );
};
