import { Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    SectionExport,
    SupervSearchForm,
    TableSupervisores,
} from "../../components";
import { useSupervisorStore } from "../../hooks";

export const SearchSuperPage = () => {
    const { startExportTablePDF, startExportCrendenciales } = useSupervisorStore();

    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
        },
    });

    const handleExportPDF = (e) => {
        e.preventDefault();
        startExportTablePDF(form.values);
    };

    const handleExportCrendencial = (e) => {
        e.preventDefault();
        startExportCrendenciales(form.values);
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        console.log('clic');
    };

    return (
        <>
            <Card
                withBorder
                radius="md"
                mt="lg"
                mb="lg"
                shadow="sm"
                sx={{ position: "static" }}
            >
                <Card.Section withBorder inheritPadding py="lg">
                    <SectionExport
                        title="Exportación de Supervisores"
                        handleExportCrendencial={handleExportCrendencial}
                        handleExportPDF={handleExportPDF}
                        handleExportExcel={handleExportExcel}
                    />
                </Card.Section>
                <Card.Section>
                    <SupervSearchForm form={form} />
                </Card.Section>
            </Card>
            <TableSupervisores viewBtn={0} />
            {/* <ModalSupervisor /> */}
        </>
    );
};
