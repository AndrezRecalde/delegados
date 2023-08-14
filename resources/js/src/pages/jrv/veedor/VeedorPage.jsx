import { useEffect } from "react";
import { Card } from "@mantine/core";
import {
    InfoHeader,
    ModalActivateVeed,
    ModalImportVeed,
    ModalVeedor,
    SectionImport,
    TableVeedores,
    TitlePage,
} from "../../../components";
import { useUiVeedor, useVeedorStore } from "../../../hooks";

export const VeedorPage = () => {
    const { veedores, startLoadVeedores, startClearVeedores } =
        useVeedorStore();
    const { modalActionFileVeedor } = useUiVeedor();

    useEffect(() => {
        startLoadVeedores();

        return () => {
            startClearVeedores();
        };
    }, []);

    const handleImportVeed = (e) => {
        e.preventDefault();
        modalActionFileVeedor(1);
    };

    return (
        <>
            <TitlePage title="Veedores" color="dark" fz={18} fw={700} />
            <InfoHeader
                texto={`Existen ${veedores.length} delegados registrados a nivel de la provincia de Esmeraldas.`}
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
                        title="Lista de Veedores"
                        handleOpen={handleImportVeed}
                    />
                </Card.Section>
                <Card.Section>
                    <TableVeedores />
                </Card.Section>
            </Card>
            <ModalVeedor />
            <ModalActivateVeed />
            <ModalImportVeed />
        </>
    );
};
