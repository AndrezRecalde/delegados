import { useEffect } from "react";
import { Card } from "@mantine/core";
import {
    InfoHeader,
    ModalEscaneador,
    ModalImportEscaneador,
    SectionImport,
    TableEscaneadores,
    TitlePage,
} from "../../components";
import { useEscanerStore, useUiEscaner } from "../../hooks";

export const EscanerPage = () => {
    const { escaneadores, startLoadEscaneres, startClearEscaneadores } = useEscanerStore();
    const { modalActionImportEscaner } = useUiEscaner();

    useEffect(() => {
        startLoadEscaneres();

        return () => {
            startClearEscaneadores();
        }
    }, []);

    const handleImportEsc = (e) => {
        e.preventDefault();
        modalActionImportEscaner(1);
    };

    return (
        <>
            <TitlePage title="Escaneadores" color="dark" fz={18} fw={700} />
            <InfoHeader texto={`Existen ${escaneadores.length} escaneadores registrados a nivel de la provincia de Esmeraldas.`} />
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
                        title="Lista de Escaneadores"
                        handleOpen={handleImportEsc}
                    />
                </Card.Section>
                <Card.Section>
                    <TableEscaneadores />
                </Card.Section>
            </Card>
            <ModalEscaneador />
            <ModalImportEscaneador />
        </>
    );
};
