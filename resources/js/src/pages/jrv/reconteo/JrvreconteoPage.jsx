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

export const JrvreconteoPage = () => {
    const { reconteos, startLoadJrvReconteos, startClearJrvReconteos, startExportCredenciales, startExcelJrvReconteo } =
        useReconteoStore();

    const { modalActionImportReconteo } = useUiReconteo();

    useEffect(() => {
        startLoadJrvReconteos();

        return () => {
            startClearJrvReconteos();
        };
    }, []);

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
            <TitlePage title="JRV de Reconteo" color="dark" fz={18} fw={700} />
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
                    <SectionImport
                        title="Lista de JRV Reconteo"
                        handleOpen={handleImportVeed}
                    />
                    <Group>
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
