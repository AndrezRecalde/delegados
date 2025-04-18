import { Modal, useMantineTheme } from "@mantine/core";
import { FormEscaneador, TextSection } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEscanerStore, useUiEscaner } from "../../../hooks";

export const ModalEscaneador = () => {
    const theme = useMantineTheme();
    const { setClearActivateEscaner } = useEscanerStore();
    const { isOpenModalEscaneador, modalActionEscaner } = useUiEscaner();

    const form = useForm({
        initialValues: {
            nombres: "",
            apellidos: "",
            dni: "",
            telefono: "",
            canton_id: "",
            parroquia_id: "",
            recinto_id: "",
        },
        validate: {
            nombres_completos: isNotEmpty(
                "Por favor ingrese apellidos y nombres"
            ),
            dni: isNotEmpty("Por favor ingrese número de cédula"),
            telefono: isNotEmpty("Por favor ingrese número telefónico"),
            canton_id: isNotEmpty("Por favor ingrese el cantón de asignación"),
            parroquia_id: isNotEmpty("Por favor ingrese la parroquia"),
            recinto_id: isNotEmpty("Por favor ingrese el recinto"),
        },
    });

    const handleCloseModalEscaner = () => {
        form.reset();
        setClearActivateEscaner();
        modalActionEscaner(0);
    };

    return (
        <Modal
            centered
            opened={isOpenModalEscaneador}
            onClose={handleCloseModalEscaner}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    Escaneador
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
            <FormEscaneador form={form} />
        </Modal>
    );
};
