import { Card } from "@mantine/core";
import { EscSearchForm, SectionExport, TableEscaneadores } from "../../components";
import { useForm } from "@mantine/form";
import { useEscanerStore } from "../../hooks";

export const SearchEscanerPage = () => {

    const { startExportTablePDF, startExportCredenciales, exportExcelEscaner } = useEscanerStore();

    const form = useForm({
        initialValues: {
            canton_id: 0,
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
        exportExcelEscaner(form.values);
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
                        title="Exportación de Escaneadores"
                        handleExportCrendencial={handleExportCrendencial}
                        handleExportPDF={handleExportPDF}
                        handleExportExcel={handleExportExcel}
                    />
                </Card.Section>
                <Card.Section>
                    <EscSearchForm form={form} />
                </Card.Section>
            </Card>
            <TableEscaneadores viewBtn={0} />
            {/* <ModalSupervisor /> */}
        </>
    );
};
