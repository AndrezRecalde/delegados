import { Card } from "@mantine/core";
import { InfoHeader, ModalActivateUser, ModalUsuario, TableUsuarios, TitlePage } from "../../components";
import { useUsuarioStore } from "../../hooks";
import { useEffect } from "react";

export const UsuarioPage = () => {
    const { usuarios, startLoadUsuarios, startClearUsuarios } =
        useUsuarioStore();

    useEffect(() => {
        startLoadUsuarios();

        return () => {
            startClearUsuarios();
        };
    }, []);

    return (
        <>
            <TitlePage title="Usuarios" color="dark" fz={18} fw={700} />
            <InfoHeader texto={`Existen ${usuarios.length} usuarios registrados al sistema.`} />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitlePage
                        title="Lista de usuarios"
                        color="dimmed"
                        fw={700}
                    />
                </Card.Section>
                <Card.Section>
                    <TableUsuarios />
                </Card.Section>
            </Card>
            <ModalUsuario />
            <ModalActivateUser />
        </>
    );
};
