import { useEffect } from "react";
import { Button, Card, Group } from "@mantine/core";
import {
    InfoHeader,
    ModalImportJrvReconteo,
    ModalJrvreconteo,
    SectionImport,
    TableJrvreconteo,
    TitlePage,
} from "../../../components";
import { useReconteoStore, useUiReconteo } from "../../../hooks";
import { IconCards, IconFileDownload } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const JrvreconteoPage = () => {
    const {
        reconteos,
        startLoadJrvReconteos,
        startClearJrvReconteos,
        startExportCredenciales,
        startExcelJrvReconteo,
        isExport,
        errores,
        message,
    } = useReconteoStore();

    const { modalActionImportReconteo } = useUiReconteo();

    useEffect(() => {
        startLoadJrvReconteos();

        return () => {
            startClearJrvReconteos();
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
        modalActionImportReconteo(1);
    };

    const handleExportCrendencial = (e) => {
        e.preventDefault();
        startExportCredenciales();
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        startExcelJrvReconteo();
    };

    return (
        <>
            <TitlePage ta="left" order={3}>
                JRV de Reconteo
            </TitlePage>
            <InfoHeader
                texto={`Existen ${reconteos.length} delegados de reconteo registrados a nivel de la provincia de Esmeraldas.`}
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
                            title="Lista de JRV Reconteo"
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
                    <TableJrvreconteo />
                </Card.Section>
            </Card>
            <ModalJrvreconteo />
            <ModalImportJrvReconteo />
        </>
    );
};
