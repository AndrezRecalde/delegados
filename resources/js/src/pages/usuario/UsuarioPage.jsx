import { useEffect } from "react";
import {
    InfoHeader,
    ModalActivateUser,
    ModalUsuario,
    TableUsuarios,
    TitlePage,
} from "../../components";
import { useUsuarioStore } from "../../hooks";
import Swal from "sweetalert2";

export const UsuarioPage = () => {
    const {
        usuarios,
        startLoadUsuarios,
        startClearUsuarios,
        message,
        errores,
    } = useUsuarioStore();

    useEffect(() => {
        startLoadUsuarios();

        return () => {
            //startClearUsuarios();
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
                Usuarios
            </TitlePage>

            <InfoHeader
                texto={`Existen ${usuarios.length} usuarios registrados al sistema.`}
            />

            <TableUsuarios />

            <ModalUsuario />
            <ModalActivateUser />
        </>
    );
};
