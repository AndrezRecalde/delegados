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

export const JrvmovilPage = () => {
    const {
        jrvmoviles,
        startLoadJrvmoviles,
        startExportCredenciales,
        exportExcelJrvmoviles,
        startClearJrvmoviles,
    } = useJrvmovilStore();
    const { modalActionImportJrvmovil } = useUiJrvmovil();

    useEffect(() => {
        startLoadJrvmoviles();

        return () => {
            startClearJrvmoviles();
        };
    }, []);

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
            <TitlePage title="JRV Moviles" color="dark" fz={18} fw={700} />
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
                    <SectionImport
                        title="Lista de JRV Moviles"
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
                    <TableJrvmoviles />
                </Card.Section>
            </Card>
            <ModalJrvmovil />
            <ModalImportJrvmovil />
        </>
    );
};
