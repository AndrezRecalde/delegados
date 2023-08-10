import { Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    SectionExport,
    TableVeedores,
    VeedSearchForm,
} from "../../components";
import { useVeedorStore } from "../../hooks";

export const SearchVeedPage = () => {
    const { startExportTablePDF, startExportCredenciales } = useVeedorStore();

    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
            recinto_id: 0,
            coordinador_id: 0,
            supervisor_id: 0,
        },
    });

    const handleExportPDF = (e) => {
        e.preventDefault();
        startExportTablePDF(form.values);
    };

    const handleExportCrendencial = (e) => {
        e.preventDefault();
        startExportCredenciales(form.values);
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        console.log("clic");
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
                        title="Exportación de Delegados"
                        handleExportCrendencial={handleExportCrendencial}
                        handleExportPDF={handleExportPDF}
                        handleExportExcel={handleExportExcel}
                    />
                </Card.Section>
                <Card.Section>
                    <VeedSearchForm form={form} />
                </Card.Section>
            </Card>
            <TableVeedores viewBtn={0} />
            {/* <ModalSupervisor /> */}
        </>
    );
};
