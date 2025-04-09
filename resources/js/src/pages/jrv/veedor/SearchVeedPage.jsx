import { Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    SectionExport,
    TableVeedores,
    VeedSearchForm,
} from "../../../components";
import {
    useCoordinadorStore,
    useSupervisorStore,
    useVeedorStore,
} from "../../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { ROLES } from "../../../helpers/getDictionary";

export const SearchVeedPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadSupervisorForDNI } = useSupervisorStore();
    const { startLoadCoordinadorForDNI } = useCoordinadorStore();
    const {
        startExportTablePDF,
        startExportCredenciales,
        startClearVeedores,
        exportExcelVeedores,
        isExport,
        message,
        errores,
    } = useVeedorStore();

    const form = useForm({
        initialValues: {
            canton_id: null,
            parroquia_id: null,
            recinto_id: null,
            coordinador_id: null,
            supervisor_id: null,
        },
        transformValues: (values) => ({
            canton_id: Number(values.canton_id) || null,
            parroquia_id: Number(values.parroquia_id) || null,
            recinto_id: Number(values.recinto_id) || null,
            coordinador_id: Number(values.coordinador_id) || null,
            supervisor_id: Number(values.supervisor_id) || null,
        }),
    });

    useEffect(() => {
        if (usuario.role === ROLES.SUPERVISOR) {
            startLoadSupervisorForDNI(usuario.dni);
            return;
        }
        if (usuario.role === ROLES.COORDINADOR) {
            startLoadCoordinadorForDNI(usuario.dni);
            return;
        }

        return () => {
            startClearVeedores();
        };
    }, []);

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
        exportExcelVeedores(form.values);
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
