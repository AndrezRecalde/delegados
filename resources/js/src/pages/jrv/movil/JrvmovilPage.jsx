import { useEffect } from "react";
import { Button, Card, Group } from "@mantine/core";
import {
    InfoHeader,
    ModalImportJrvmovil,
    ModalJrvmovil,
    SectionImport,
    TableJrvmoviles,
    TitlePage,
} from "../../../components";
import { useJrvmovilStore, useUiJrvmovil } from "../../../hooks";
import { IconCards, IconFileDownload } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const JrvmovilPage = () => {
    const {
        jrvmoviles,
        startLoadJrvmoviles,
        startExportCredenciales,
        exportExcelJrvmoviles,
        startClearJrvmoviles,
        isExport,
        message,
        errores
    } = useJrvmovilStore();
    const { modalActionImportJrvmovil } = useUiJrvmovil();

    useEffect(() => {
        startLoadJrvmoviles();

        return () => {
            startClearJrvmoviles();
        };
    }, []);

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

    const handleImportVeed = (e) => {
        e.preventDefault();
        modalActionImportJrvmovil(1);
    };

    const handleExportCrendencial = (e) => {
        e.preventDefault();
        startExportCredenciales({});
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        exportExcelJrvmoviles();
    };

    return (
        <>
            <TitlePage ta="left" order={3}>
                JRV Móviles
            </TitlePage>
            <InfoHeader
                texto={`Existen ${jrvmoviles.length} delegados moviles registrados a nivel de la provincia de Esmeraldas.`}
            />
            <Card
                withBorder
                radius="md"
                mt="lg"
                mb="lg"
                shadow="sm"
                sx={{ position: "static" }}
            >
                <Card.Section withBorder inheritPadding py="lg">
                    <Group>
                        <SectionImport
                            title="Lista de JRV Moviles"
                            handleOpen={handleImportVeed}
                        />
                        <Button
                            variant="light"
                            color="teal.7"
                            radius="md"
                            uppercase
                            leftIcon={<IconFileDownload size="1.2rem" />}
                            onClick={(e) => handleExportExcel(e)}
                        >
                            Excel
                        </Button>
                        <Button
                            variant="light"
                            color="indigo.7"
                            radius="md"
                            uppercase
                            leftIcon={<IconCards size="1.2rem" />}
                            onClick={(e) => handleExportCrendencial(e)}
                        >
                            Credenciales
                        </Button>
                    </Group>
                </Card.Section>
                <Card.Section>
                    <TableJrvmoviles />
                </Card.Section>
            </Card>
            <ModalJrvmovil />
            <ModalImportJrvmovil />
        </>
    );
};
