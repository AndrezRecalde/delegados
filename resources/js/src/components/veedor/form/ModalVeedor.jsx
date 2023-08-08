import { isNotEmpty, useForm } from "@mantine/form";
import { Modal, useMantineTheme } from "@mantine/core";
import { useUiVeedor, useVeedorStore } from "../../../hooks";
import { TitlePage, FormVeedor } from "../../../components";


export const ModalVeedor = () => {
    const theme = useMantineTheme();
    const { isOpenModalVeedor, modalActionVeedor } = useUiVeedor();
    const { setClearActivateVeedor } = useVeedorStore();

    const form = useForm({
        initialValues: {
            nombres_completos: "",
            dni: "",
            telefono: "",
            coordinador_id: "",
            canton_id: "",
            recinto_id: "",
        },
        validate: {
            nombres_completos: isNotEmpty("Por favor ingrese apellidos y nombres"),
            dni: isNotEmpty("Por favor ingrese número de cédula"),
            telefono: isNotEmpty("Por favor ingrese número telefónico"),
            coordinador_id: isNotEmpty("Por favor seleccione el coordinador"),
            canton_id: isNotEmpty("Por favor ingrese el cantón de residencia"),
            recinto_id: isNotEmpty("Por favor ingrese el recinto electoral donde vota")
        }
    });

    const handleCloseModalVeedor = () => {
        form.reset();
        setClearActivateVeedor();
        modalActionVeedor(0);
    }

    return (
        <Modal
            opened={isOpenModalVeedor}
            onClose={handleCloseModalVeedor}
            title={<TitlePage title="Veedor" fz={14} fw={700} />}
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
