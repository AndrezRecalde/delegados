import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TextSection } from "../../../../components";
import { useStateStore, useUiVeedor, useVeedorStore } from "../../../../hooks";
import { FormDelegadoPublic } from "../form/FormDelegadoPublic";
import { useEffect } from "react";

export const ModalDelegadoPublic = () => {
    const theme = useMantineTheme();
    const { isOpenModalVeedor, modalActionVeedor } = useUiVeedor();
    const { startLoadCantones } = useStateStore();

    const form = useForm({
        initialValues: {
            delegados: [
                {
                    nombres: "",
                    apellidos: "",
                    dni: "",
                    canton_id: null,
                    parroquia: "",
                    recinto: "",
                    junta: "",
                },
            ],
        },
       /*  validate: {
            delegados: (delegados) =>
                delegados.map((delegado) => ({
                    nombres: delegado.nombres ? null : "Por favor ingrese nombres",
                    apellidos: delegado.apellidos ? null : "Por favor ingrese apellidos",
                    dni: delegado.dni ? null : "Por favor ingrese número de cédula",
                    canton_id: delegado.canton_id ? null : "Por favor ingrese el cantón",
                    parroquia: delegado.parroquia ? null : "Por favor ingrese la parroquia",
                    recinto: delegado.recinto ? null : "Por favor ingrese el recinto electoral",
                    junta: delegado.junta ? null : "Por favor ingrese el recinto electoral",
                })),
        }, */
        transformValues: (values) => ({
            ...values,
            delegados: values.delegados.map((d) => ({
                ...d,
                canton_id: Number(d.canton_id) || null,
                //parroquia_id: Number(d.parroquia_id) || null,
            })),
        }),
    });

    useEffect(() => {
        if (isOpenModalVeedor) {
            startLoadCantones();
        }
    }, [isOpenModalVeedor]);

    const handleCloseModalVeedor = () => {
        form.reset();
        modalActionVeedor(0);
    };

    return (
        <Modal
            opened={isOpenModalVeedor}
            onClose={handleCloseModalVeedor}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    Delegado
                </TextSection>
            }
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
            radius="md"
        >
            <FormDelegadoPublic form={form} />
        </Modal>
    );
};
