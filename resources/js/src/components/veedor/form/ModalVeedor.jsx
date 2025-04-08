import { isNotEmpty, useForm } from "@mantine/form";
import { Modal, useMantineTheme } from "@mantine/core";
import { useUiVeedor, useVeedorStore } from "../../../hooks";
import { FormVeedor, TextSection } from "../../../components";

export const ModalVeedor = () => {
    const theme = useMantineTheme();
    const { isOpenModalVeedor, modalActionVeedor } = useUiVeedor();
    const { setClearActivateVeedor } = useVeedorStore();

    const form = useForm({
        initialValues: {
            nombres: "",
            apellidos: "",
            dni: "",
            telefono: "",
            coordinador_id: null,
            canton_id: null,
            recinto_id: null,
            junta_id: null,
        },
        validate: {
            nombres: isNotEmpty("Por favor ingrese nombres"),
            apellidos: isNotEmpty("Por favor ingrese apellidos"),
            dni: isNotEmpty("Por favor ingrese número de cédula"),
            //telefono: isNotEmpty("Por favor ingrese número telefónico"),
            coordinador_id: isNotEmpty("Por favor seleccione el coordinador"),
            canton_id: isNotEmpty("Por favor ingrese el cantón de residencia"),
            recinto_id: isNotEmpty(
                "Por favor ingrese el recinto electoral donde vota"
            ),
        },
        transformValues: (values) => ({
            ...values,
            coordinador_id: Number(values.coordinador_id) || null,
            canton_id: Number(values.canton_id) || null,
            recinto_id: Number(values.recinto_id) || null,
            junta_id: Number(values.junta_id) || null,
        }),
    });

    const handleCloseModalVeedor = () => {
        form.reset();
        setClearActivateVeedor();
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
            <FormVeedor form={form} />
        </Modal>
    );
};
