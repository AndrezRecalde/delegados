import { useEffect } from "react";
import { Container, Divider, Group, Stack } from "@mantine/core";
import { BtnAdd, InfoHeader, TitlePage, ModalJrvPublic } from "../../../../components";
import { useJrvmovilStore, useUiJrvmovil } from "../../../../hooks";
import Swal from "sweetalert2";

export const JvrmovilPublicPage = () => {
    const { isExport, message, errores } = useJrvmovilStore();
    const { modalActionJrvmovil } = useUiJrvmovil();

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
        modalActionJrvmovil(1);
    };

    return (
        <Container size="lg" px={40} py={40}>
            <Group position="apart">
                <TitlePage ta="left" order={3}>
                    CDA Delegados
                </TitlePage>
            </Group>
            <Divider my="md" />
            <InfoHeader texto="Genere credencial de CDA Delegados" />

            <Stack>
                <Group>
                    <BtnAdd
                        title="Credencial CDA Delegado"
                        handleAdd={handleOpen}
                        heigh={50}
                    />
                </Group>
            </Stack>

            <ModalJrvPublic />
        </Container>
    );
};
