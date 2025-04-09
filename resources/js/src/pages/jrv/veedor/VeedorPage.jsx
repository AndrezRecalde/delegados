import { useEffect } from "react";
import {
    InfoHeader,
    ModalActivateVeed,
    ModalImportVeed,
    ModalVeedor,
    TableVeedores,
    TitlePage,
} from "../../../components";
import {
    useCoordinadorStore,
    useSupervisorStore,
    useVeedorStore,
} from "../../../hooks";
import Swal from "sweetalert2";
import { Divider } from "@mantine/core";
import { ROLES } from "../../../helpers/getDictionary";

export const VeedorPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { activateCoordinador, startLoadCoordinadorForDNI } =
        useCoordinadorStore();
    const { activateSupervisor, startLoadSupervisorForDNI } =
        useSupervisorStore();
    const {
        veedores,
        startLoadVeedores,
        startClearVeedores,
        message,
        errores,
    } = useVeedorStore();

    useEffect(() => {
        return () => {
            // Limpiar el estado de veedores al salir del componente
            startClearVeedores();
        };
    }, []);

    useEffect(() => {
        if (usuario.role === ROLES.SUPERVISOR) {
            startLoadSupervisorForDNI(usuario.dni);
            return;
        }
        if (usuario.role === ROLES.COORDINADOR) {
            startLoadCoordinadorForDNI(usuario.dni);
            return;
        }
    }, []);

    useEffect(() => {
        if (usuario.role === ROLES.ADMIN) {
            // Si el usuario es "Administrador", cargamos todos los veedores
            startLoadVeedores({});
            return;
        }
    }, []);

    useEffect(() => {
        if (
            usuario.role === ROLES.SUPERVISOR &&
            activateSupervisor &&
            activateSupervisor.parroquias?.length > 0
        ) {
            const parroquiasId = activateSupervisor?.parroquias.map(
                (parroquia) => parroquia.id
            );
            startLoadVeedores({ parroquias: parroquiasId });
        }
    }, [activateSupervisor]);

    useEffect(() => {
        if (
            usuario.role === ROLES.COORDINADOR &&
            activateCoordinador &&
            activateCoordinador.recintos?.length > 0
        ) {
            const recintosId = activateCoordinador?.recintos?.map(
                (recinto) => recinto.id
            );
            startLoadVeedores({ recintos: recintosId }); // Pasamos los IDs de los recintos
            return;
        }
    }, [activateCoordinador]);

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
            <Divider my="md" />
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
