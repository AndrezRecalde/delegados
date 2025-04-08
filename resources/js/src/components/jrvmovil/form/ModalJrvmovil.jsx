import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormJrvmovil, TextSection } from "../../../components";
import { useJrvmovilStore, useUiJrvmovil } from "../../../hooks";

export const ModalJrvmovil = () => {
    const theme = useMantineTheme();
    const { isOpenModalJrvmovil, modalActionJrvmovil } = useUiJrvmovil();
    const { setClearActivateJrvmovil } = useJrvmovilStore();

    const form = useForm({
        initialValues: {
            nombres: "",
            apellidos: "",
            dni: "",
        },
        validate: {
            nombres: isNotEmpty("Por favor ingrese nombres"),
            apellidos: isNotEmpty("Por favor ingrese apellidos"),
            dni: isNotEmpty("Por favor ingrese número de cédula"),
        },
    });

    const handleCloseModalJrvmovil = () => {
        form.reset();
        setClearActivateJrvmovil();
        modalActionJrvmovil(0);
    };

    return (
        <Modal
            centered
            opened={isOpenModalJrvmovil}
            onClose={handleCloseModalJrvmovil}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    JRV Movil
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
            <FormJrvmovil form={form} />
        </Modal>
    );
};
