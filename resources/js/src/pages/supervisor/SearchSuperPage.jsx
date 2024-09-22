import { Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    SectionExport,
    SupervSearchForm,
    TableSupervisores,
} from "../../components";
import { useSupervisorStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const SearchSuperPage = () => {
    const {
        startExportTablePDF,
        startExportCrendenciales,
        isExport,
        message,
        errores,
    } = useSupervisorStore();

    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
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
                timer: 1500,
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
                timer: 1500,
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
        startExportCrendenciales(form.values);
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
