import { useEffect } from "react";
import { Card } from "@mantine/core";
import {
    EscSearchForm,
    SectionExport,
    TableEscaneadores,
} from "../../components";
import { useForm } from "@mantine/form";
import { useEscanerStore } from "../../hooks";
import Swal from "sweetalert2";

export const SearchEscanerPage = () => {
    const {
        startExportTablePDF,
        startExportCredenciales,
        exportExcelEscaner,
        isExport,
        message,
        errores,
    } = useEscanerStore();

    const form = useForm({
        initialValues: {
            canton_id: 0,
        },
    });

    useEffect(() => {
        if (isExport === true) {
            Swal.fire({
                icon: "warning",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando isExport es false
        }
    }, [isExport]);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [errores]);

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
