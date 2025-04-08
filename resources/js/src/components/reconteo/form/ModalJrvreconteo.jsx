import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormJrvreconteo, TextSection } from "../../../components";
import { useReconteoStore, useUiReconteo } from "../../../hooks";

export const ModalJrvreconteo = () => {
    const theme = useMantineTheme();
    const { isOpenModalReconteo, modalActionReconteo } = useUiReconteo();
    const { setClearActivateJrvReconteo } = useReconteoStore();

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

    const handleCloseModalJrvreconteo = () => {
        form.reset();
        setClearActivateJrvReconteo();
        modalActionReconteo(0);
    };

    return (
        <Modal
            centered
            opened={isOpenModalReconteo}
            onClose={handleCloseModalJrvreconteo}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    JRV Reconteo
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
            <FormJrvreconteo form={form} />
        </Modal>
    );
};
