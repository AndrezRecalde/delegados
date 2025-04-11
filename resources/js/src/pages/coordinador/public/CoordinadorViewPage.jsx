import { useEffect } from "react";
import { Container, Divider, Group, Stack } from "@mantine/core";
import {
    BtnAdd,
    InfoHeader,
    ModalCoordinadorPublic,
    TitlePage,
} from "../../../components";
import { useCoordinadorStore, useUiCoordinador } from "../../../hooks";
import Swal from "sweetalert2";

export const CoordinadorViewPage = () => {
    const { isExport, message, errores } = useCoordinadorStore();
    const { modalActionCoordinador } = useUiCoordinador();

    useEffect(() => {
        if (isExport === true) {
            Swal.fire({
                icon: "warning",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando isExport es false
        }
    }, [isExport]);

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

    const handleOpen = () => {
        console.log("clic");
        modalActionCoordinador(1);
    };

    return (
        <Container size="lg" px={40} py={40}>
            <Group position="apart">
                <TitlePage ta="left" order={3}>
                    Coordinadores
                </TitlePage>
            </Group>
            <Divider my="md" />
            <InfoHeader texto="Genere credencial de Coordinador" />

            <Stack>
                <Group>
                    <BtnAdd
                        title="Credencial Coordinador"
                        handleAdd={handleOpen}
                        heigh={50}
                    />
                </Group>
            </Stack>

        <ModalCoordinadorPublic />
        </Container>
    );
};
