import { useEffect } from "react";
import { Button, Card, Group } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useCoordinadorStore, useUiCoordinador } from "../../hooks";
import {
    InfoHeader,
    ModalCoordinador,
    ModalImportCoord,
    SectionImport,
    TableCoordinadores,
    TitlePage,
} from "../../components";

export const CoordinadorPage = () => {
    const { coordinadores, startLoadCoordinadores, startClearCoordinadores } = useCoordinadorStore();
    const { modalActionImportCoord } = useUiCoordinador();

    useEffect(() => {
        startLoadCoordinadores();

        return () => {
            startClearCoordinadores();
        }
    }, []);

    const handleImportCoord = (e) => {
        e.preventDefault();
        modalActionImportCoord(1);
    };

    return (
        <>
            <TitlePage title="Coordinadores" color="dark" fz={18} fw={700} />
            <InfoHeader texto={`Existen ${coordinadores.length} coordinadores a nivel de la provincia de Esmeraldas.`} />
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
                        title="Lista de Coordinadores"
                        handleOpen={handleImportCoord}
                    />
                </Card.Section>
                <Card.Section>
                    <TableCoordinadores />
                </Card.Section>
            </Card>
            <ModalCoordinador />
            <ModalImportCoord />
        </>
    );
};
