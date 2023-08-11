import { Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CoordSearchForm, SectionExport, TableCoordinadores } from "../../components";
import { useCoordinadorStore } from "../../hooks";

export const SearchCoordPage = () => {
    const { startExportTablePDF, startExportCredenciales, exportExcelCoordinadores } = useCoordinadorStore();

    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
            recinto_id: 0,
            supervisor_id: 0,
        },
    });

    const handleExportPDF = (e) => {
        e.preventDefault();
        startExportTablePDF(form.values);
    }

    const handleExportCrendencial = (e) => {
        e.preventDefault();
        startExportCredenciales(form.values);
    }

    const handleExportExcel = (e) => {
        e.preventDefault();
        console.log('clic');
        exportExcelCoordinadores();
    }

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
                        title="Exportación de Coordinadores"
                        handleExportCrendencial={handleExportCrendencial}
                        handleExportPDF={handleExportPDF}
                        handleExportExcel={handleExportExcel}
                    />
                </Card.Section>
                <Card.Section>
                    <CoordSearchForm form={form} />
                </Card.Section>
            </Card>
            <TableCoordinadores viewBtn={0} />
            {/* <ModalSupervisor /> */}
        </>
    );
};
