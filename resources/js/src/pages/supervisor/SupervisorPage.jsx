import { Card } from "@mantine/core";
import {
    InfoHeader,
    ModalImportSuperv,
    ModalSupervisor,
    SectionImport,
    TableSupervisores,
    TitlePage,
} from "../../components";
import { useSupervisorStore, useUiSupervisor } from "../../hooks";
import { useEffect } from "react";

export const SupervisorPage = () => {
    const { supervisores, startLoadSupervisores, startClearSupervisores } =
        useSupervisorStore();
    const { modalActionImportSuper } = useUiSupervisor();

    useEffect(() => {
        startLoadSupervisores();

        return () => {
            startClearSupervisores();
        };
    }, []);

    const handleImportSuperv = (e) => {
        e.preventDefault();
        modalActionImportSuper(1);
    };

    return (
        <>
            <TitlePage title="Supervisores" color="dark" fz={18} fw={700} />
            <InfoHeader
                texto={`Existen ${supervisores.length} supervisores a nivel de la provincia de Esmeraldas.`}
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
                        title="Lista de Supervisores"
                        handleOpen={handleImportSuperv}
                    />
                </Card.Section>
                <Card.Section>
                    <TableSupervisores />
                </Card.Section>
            </Card>
            <ModalSupervisor />
            <ModalImportSuperv />
        </>
    );
};
